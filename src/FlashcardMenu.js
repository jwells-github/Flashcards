import React, {Component} from 'react'
import DeckView from './DeckView';
import FlashcardForm from './FlashcardForm';

class FlashcardMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            flashcards: [],
            decks: [],
            deckSelected: false,
            selectedDeck: '',
            cardCreatedSuccessfully: undefined,
        };
        this.createFlashcard = this.createFlashcard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateCardDeck = this.updateCardDeck.bind(this);
        this.removeFlashcard = this.removeFlashcard.bind(this);
        this.editFlashcard = this.editFlashcard.bind(this);
        this.exitDeckView = this.exitDeckView.bind(this);
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
        window.onpopstate = () => console.log('??');
    }

    getDeckNames(flashcards){
        return [...new Set(flashcards.map(card => card.cardDeck))] 
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
            decks: [...new Set([...prevState.decks, card.cardDeck])],
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
    selectDeck(deck){
        this.setState({deckSelected: true, selectedDeck: deck})
    }
    exitDeckView(){
        window.history.forward()
        this.setState({deckSelected: false, selectedDeck: ''})
    }
    render(){
        if(this.state.deckSelected){
            return(
                <div>
                    <DeckView
                        cards={this.state.flashcards.filter(card => card.cardDeck === this.state.selectedDeck)}
                        removeFlashcard = {this.removeFlashcard}
                        editFlashcard={this.editFlashcard}
                        decks={this.state.decks}
                        exitDeckView ={this.exitDeckView}
                        />
                </div>
               )
        }
        else{
            return(
                <div>
                    <FlashcardForm
                        decks={this.state.decks} 
                        returnCard={this.createFlashcard}
                        cardHandlingSuccess={this.state.cardCreatedSuccessfully}
                    />
                    <div className="decks">
                        {this.state.decks.map((deck,index) =>
                            <div className="deck" key={index}>
                                <span onClick={()=>this.selectDeck(deck)}>{deck}</span>
                            </div>
                        )}
                    </div>
                </div>
               )
        }

      }
}

export default FlashcardMenu;