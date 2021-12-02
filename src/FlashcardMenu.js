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
            searchFilter: '',
            playMode: false,
            deckSelected: false,
            selectedCards: [],
            cardCreatedSuccessfully: undefined,
            displayCardForm: false,
            sortOptions: [
                {name: "Alphabetical", active: false},
                {name: "Reverse alphabetical", active: false},
                {name: "Number of cards (ascending)", active: false},
                {name: "Number of cards (descending)", active: true},
            ],
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
        this.updateSortPreference = this.updateSortPreference.bind(this);
        this.sortDecks = this.sortDecks.bind(this);
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
                    decks: this.sortDecks(this.getDeckNames(response.flashcards))
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
            decks: this.sortDecks(this.getDeckNames(filteredFlashcards))
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
            decks: this.sortDecks(this.getDeckNames([...prevState.flashcards, card])),
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
        this.setState({deckSelected: false, selectedCards: []})
    }
    exitPlayView(){
        this.setState({deckSelected: false, selectedCards: [], playMode: false})
    }
    hideFlashcardForm(){
        this.setState({displayCardForm:false})
    }
    showFlashcardForm(){
        this.setState({displayCardForm:true})
    }
    updateSortPreference(event){    
        let sortPreferences = this.state.sortOptions;
        sortPreferences.forEach(option => {
            if(option.name === event.target.value){
                option.active = true;    
            }
            else{
                option.active = false;
            }
        });
        this.setState({sortOptions: sortPreferences}, 
            this.setState({decks: this.sortDecks(this.state.decks)}
        ));
    }

    sortDecks(decks){
        switch(this.state.sortOptions.find(p => p.active).name){
            case "Alphabetical":
                decks.sort((a,b) => a.deckName.localeCompare(b.deckName))
                break;
            case "Reverse alphabetical":
                decks.sort((a,b) => b.deckName.localeCompare(a.deckName))
                break;
            case "Number of cards (ascending)":
                decks.sort((a,b) => a.count - b.count)
                break;
            case "Number of cards (descending)":
                decks.sort((a,b) => b.count - a.count)
                break;
            default:
                break;
        }
        return decks;
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
                <div className="flashcardMenu">
                    <FlashcardForm
                        hideOverlay = {this.hideFlashcardForm}
                        displayForm = {this.state.displayCardForm}
                        decks={this.state.decks.map(deck => deck.deckName)} 
                        returnCard={this.createFlashcard}
                        cardHandlingSuccess={this.state.cardCreatedSuccessfully}
                    />
                    <div className="deckContainer">
                        <div className="deckOptions">
                            <button onClick={this.showFlashcardForm}>Add a flashcard</button>
                            <button onClick={this.playAllCards}>Play All</button>
                            <input placeholder="Search..." onChange={this.handleChange} name="searchFilter" type="text"></input>
                            <select defaultValue={this.state.sortOptions.find(p => p.active).name} onChange={this.updateSortPreference}>
                                <optgroup label="Sort Method"> 
                                    {this.state.sortOptions.map(sortOption => 
                                        <option key={sortOption.name}  value={sortOption.name}>{sortOption.name}</option>)
                                    }
                                </optgroup>
                            </select>
                        </div>
                        <div className="decks">
                            {this.state.decks.filter(deck => deck.deckName.match(new RegExp(this.state.searchFilter,"g"))).map((deck,index) =>
                                <div className="deck" key={index}>
                                    <h1>{deck.deckName}</h1>
                                    <span>{deck.count} {deck.count > 1 ? "cards" : "card"}</span>
                                    <div>
                                        <button onClick={() => this.playDeck(deck.deckName)}>Play Deck</button>
                                        <button onClick={() => this.selectDeck(deck.deckName)}>Edit Deck</button>
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