import React, {Component} from 'react'
import DeckSortOptions from './DeckSortOptions';
import DeckView from './DeckView';
import FlashcardForm from './FlashcardForm';
import PlayView from './PlayView';
import ScreenOverlay from './ScreenOverlay';

class FlashcardMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            flashcards: [],
            decks: [],
            searchFilter: '',
            playMode: false,
            inDeckView: false,
            deckSelected: false,
            selectedCards: [],
            allCardsSelected: false,
            cardCreatedSuccessfully: undefined,
            displayCardForm: false,
        };
        this.createFlashcard = this.createFlashcard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateCardDeck = this.updateCardDeck.bind(this);
        this.removeFlashcard = this.removeFlashcard.bind(this);
        this.editFlashcard = this.editFlashcard.bind(this);
        this.exitDeckView = this.exitDeckView.bind(this);
        this.exitPlayView = this.exitPlayView.bind(this);
        this.playDeck = this.playDeck.bind(this);
        this.playAllCards = this.playAllCards.bind(this);
        this.hideFlashcardForm = this.hideFlashcardForm.bind(this);
        this.showFlashcardForm = this.showFlashcardForm.bind(this);
        this.enterDeckView = this.enterDeckView.bind(this);
        this.deckViewAllCards = this.deckViewAllCards.bind(this);
        this.editDeckName = this.editDeckName.bind(this);
        this.updateDecks = this.updateDecks.bind(this);
    }

    componentDidMount(){
        fetch('/flashcards/get',{
            withCredentials: true,
            credentials: 'include'
          })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    flashcards: response.flashcards,
                    decks: this.getDeckNames(response.flashcards)
                });
            });
    }

    getDeckNames(flashcards){
        let deckNames = [...new Set(flashcards.map(card => card.cardDeck))];
        let decks = [];
        deckNames.forEach(deckName => {
            let numberOfCardsInDeck = flashcards.filter(card => card.cardDeck === deckName).length;
            decks.push({deckName: deckName, count: numberOfCardsInDeck});
        });
        return decks;
    }

    editDeckName(currentName, newName){
        let editedFlashcards = this.state.flashcards.map(card =>{
            if (card.cardDeck === currentName){
                card.cardDeck = newName;
            }
            return card;
        })
        this.setState({flashcards: editedFlashcards, decks:this.getDeckNames(editedFlashcards)})
    }
    removeFlashcard(cardId){
        let filteredFlashcards = this.state.flashcards.filter(card => !card._id.match(cardId));
        this.setState({
            flashcards: filteredFlashcards,
            decks: this.getDeckNames(filteredFlashcards)
        })
    }

    editFlashcard(cardId, card){
        let allCards = this.state.flashcards.slice();
        let AllCardsindex = allCards.findIndex(card => card._id.match(cardId));
        allCards[AllCardsindex] = card
        let selectedCards = this.state.selectedCards.slice();
        let selectedCardsIndex = selectedCards.findIndex(card => card._id.match(cardId));
        selectedCards[selectedCardsIndex] = card
        this.setState({flashcards: allCards, selectedCards: selectedCards})
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    addFlashcard(card){
        this.setState(prevState => ({
            flashcards: [...prevState.flashcards, card],
            decks: this.getDeckNames([...prevState.flashcards, card]),
            cardCreatedSuccessfully:true
        }));
        if(this.state.deckSelected){
            // Update Deckview
            if(this.state.selectedCards.length){
                this.selectDeck(this.state.selectedCards[0].cardDeck)
            }
        }
    }

    createFlashcard(cardFront, cardBack, cardDeck){
        this.setState({cardCreatedSuccessfully: undefined}, () =>{
            fetch("/flashcards/create",{
                method: 'POST',   
                withCredentials: true,
                credentials: 'include',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({cardFront: cardFront, cardBack: cardBack, cardDeck: cardDeck}) 
                }).then(response => response.json()).then(response => 
                    this.addFlashcard(response));
        });
    }
    updateCardDeck(value){
        this.setState({cardDeck:value})
    }
    updateSelectionInProgress(bool){
        this.setState({selectionInProgress :bool})
    }
    playDeck(deck = ""){
        if(deck.length > 0){
            this.selectDeck(deck)
        }
        this.setState({playMode: true})
    }
    enterDeckView(deck){
        this.selectDeck(deck)
        this.setState({inDeckView: true})
    }
    deckViewAllCards(){
        this.setState({
            selectedCards: this.state.flashcards, 
            inDeckView: true, 
            deckSelected: true,
            allCardsSelected: true});
        this.props.showBackButton();
    }
    playAllCards(){
        this.setState({deckSelected: true, selectedCards: this.state.flashcards, playMode: true})
        this.props.showBackButton();
    }
    selectDeck(deck){
        this.setState({
            deckSelected: true, 
            selectedCards: this.state.flashcards.filter(card => card.cardDeck === deck)})
        this.props.showBackButton();
    }
    exitDeckView(){
        this.setState({deckSelected: false, selectedCards: [], allCardsSelected: false, inDeckView:false})
        this.props.hideBackButton();
    }
    exitPlayView(){
        if(this.state.inDeckView){
            this.setState({playMode: false})
        }
        else{
            this.setState({deckSelected: false, selectedCards: [], playMode: false})
        }
        this.props.hideBackButton();
    }
    hideFlashcardForm(){
        this.setState({displayCardForm:false})
    }
    showFlashcardForm(){
        this.setState({displayCardForm:true})
    }
    updateDecks(decks){
        this.setState({decks:decks})
    }    


    render(){
        if(this.state.deckSelected){
            if(this.state.playMode){
                return(
                        <PlayView
                            cards={this.state.selectedCards}
                            exitView={this.exitPlayView}/>
                )
            }
            else{
                return(
                    <div>
                        <DeckView
                            cards={this.state.selectedCards}
                            removeFlashcard = {this.removeFlashcard}
                            editFlashcard={this.editFlashcard}
                            createFlashcard={this.createFlashcard}
                            decks={this.state.decks}
                            exitView={this.exitDeckView}
                            playDeck={() => this.playDeck(this.state.selectedCards[0].cardDeck)}
                            editDeckName={this.editDeckName}
                            isDisplayingAllDecks={this.state.allCardsSelected}
                        />
                    </div>
                   )
            }
        }
        else{   
            return(
                <div className="flashcardMenu">
                    <ScreenOverlay hideOverlay={this.hideFlashcardForm} displayOverlay={this.state.displayCardForm}>
                        <FlashcardForm
                            hideOverlay={this.hideFlashcardForm}
                            decks={this.state.decks.map(deck => deck.deckName)} 
                            returnCard={this.createFlashcard}
                            cardHandlingSuccess={this.state.cardCreatedSuccessfully}
                        />
                    </ScreenOverlay>
                    <div className="deckContainer">
                        <div className="decks">
                            <div className="deckOptions">
                                <button onClick={this.showFlashcardForm}>Add a flashcard</button>
                                <button onClick={this.playAllCards}>Play All</button>
                                <button onClick={this.deckViewAllCards}>View All</button>
                                <input className="largeSearchbar" placeholder="Search..." onChange={this.handleChange} name="searchFilter" type="text"></input>
                                <DeckSortOptions 
                                    decks={this.state.decks}
                                    returnDecks={this.updateDecks}
                                />
                            </div>
                            {this.state.decks.filter(deck => deck.deckName.match(new RegExp(this.state.searchFilter,"g"))).map((deck,index) =>
                                <div className="deck" key={index}>
                                    <h1>{deck.deckName}</h1>
                                    <span>{deck.count} {deck.count > 1 ? "cards" : "card"}</span>
                                    <div>
                                        <button onClick={() => this.playDeck(deck.deckName)}>Play Deck</button>
                                        <button onClick={() => this.enterDeckView(deck.deckName)}>Edit Deck</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
               )
        }

      }
}

export default FlashcardMenu;