import React, {Component} from 'react'
import DeckView from './DeckView';
import FlashcardForm from './FlashcardForm';
import PlayView from './PlayView';

class FlashcardMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            flashcards: [],
            decks: [],
            playMode: false,
            deckSelected: false,
            selectedCards: [],
            cardCreatedSuccessfully: undefined,
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

    removeFlashcard(cardId){
        let filteredFlashcards = this.state.flashcards.filter(card => !card._id.match(cardId));
        this.setState({
            flashcards: filteredFlashcards,
            decks: this.getDeckNames(filteredFlashcards)
        })
    }

    editFlashcard(cardId, card){
        let editedFlashcards = this.state.flashcards.slice();
        let index = editedFlashcards.findIndex(card => card._id.match(cardId));
        editedFlashcards[index] = card
        this.setState({flashcards: editedFlashcards})
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    addFlashcard(card){
        this.setState(prevState => ({
            flashcards: [...prevState.flashcards, card],
            //decks: [...new Set([...prevState.decks, card.cardDeck])],
            cardCreatedSuccessfully:true
        }));
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
    playAllCards(){
        this.setState({deckSelected: true, selectedCards: this.state.flashcards, playMode: true})
    }
    selectDeck(deck){
        this.setState({deckSelected: true, selectedCards: this.state.flashcards.filter(card => card.cardDeck === deck)})
    }
    exitDeckView(){
        window.history.forward()
        this.setState({deckSelected: false, selectedCards: []})
    }
    exitPlayView(){
        window.history.forward()
        this.setState({deckSelected: false, selectedCards: [], playMode: false})
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
                            decks={this.state.decks}
                            exitView ={this.exitDeckView}
                            />
                    </div>
                   )
            }
        }
        else{
            return(
                <div>
                    <button onClick={this.playAllCards}>Play All</button>
                    <FlashcardForm
                        decks={this.state.decks} 
                        returnCard={this.createFlashcard}
                        cardHandlingSuccess={this.state.cardCreatedSuccessfully}
                    />
                    <div className="decks">
                        {this.state.decks.map((deck,index) =>
                            <div className="deck" key={index}>
                                <span>{deck.deckName}</span>
                                <span>{deck.count} {deck.count > 1 ? "cards" : "card"}</span>
                                <button onClick={() => this.playDeck(deck.deckName)}>Play Deck</button>
                                <button onClick={() => this.selectDeck(deck.deckName)}>Edit Deck</button>
                            </div>
                        )}
                    </div>
                </div>
               )
        }

      }
}

export default FlashcardMenu;