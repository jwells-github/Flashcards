import React, {Component} from 'react'
import DeckView from './DeckView';
import InputSuggestion from './InputSuggestion';
class FlashcardMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            flashcards: [],
            decks: [],
            cardFront: '',
            cardBack: '',
            cardDeck: '',
            deckSelected: false,
            selectedDeck: ''
        };
        this.createFlashcard = this.createFlashcard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateCardDeck = this.updateCardDeck.bind(this);
        this.removeFlashcard = this.removeFlashcard.bind(this);
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
        return [...new Set(flashcards.map(card => card.cardDeck))] 
    }

    removeFlashcard(cardId){
        let filteredFlashcards = this.state.flashcards.filter(card => !card._id.match(cardId));
        this.setState({
            flashcards: filteredFlashcards,
            decks: this.getDeckNames(filteredFlashcards)
        })
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    addFlashcard(card){
        this.setState(prevState => ({
            flashcards: [...prevState.flashcards, card],
            decks: [...new Set([...prevState.decks, card.cardDeck])],
            cardFront: '',
            cardBack: '',
            cardDeck: '',

        }));
    }

    createFlashcard(event){
        event.preventDefault();
        if(this.state.cardFront === '' || this.state.cardBack === '' || this.state.cardDeck === '') return;
        fetch("/flashcards/create",{
          method: 'POST',
          withCredentials: true,
          credentials: 'include',
          headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
          },
          body: JSON.stringify({cardFront: this.state.cardFront, cardBack: this.state.cardBack, cardDeck: this.state.cardDeck}) 
        }).then(response => response.json()).then(response => this.addFlashcard(response));
    }
    updateCardDeck(value){
        this.setState({cardDeck:value})
    }
    updateSelectionInProgress(bool){
        console.log('hmmm')
        this.setState({selectionInProgress :bool})
    }
    selectDeck(deck){
        this.setState({deckSelected: true, selectedDeck: deck})
    }
    render(){
        if(this.state.deckSelected){
            return(
                <div>
                    <DeckView
                        cards={this.state.flashcards.filter(card => card.cardDeck === this.state.selectedDeck)}
                        removeFlashcard = {this.removeFlashcard}/>
                </div>
               )
        }
        else{
            return(
                <div>
                    <div className="entranceForm">
                        <h2>Hi</h2>
                        <form onSubmit={this.createFlashcard}>
                            <div className="formField">
                                <label htmlFor="cardFront">Front Text:</label>
                                <input name="cardFront" type="text" value={this.state.cardFront} onChange={this.handleChange}/>
                            </div>
                            <div className="formField">
                                <label htmlFor="cardBack">Back Text:</label>
                                <input name="cardBack" type="text" value={this.state.cardBack} onChange={this.handleChange}/>
                            </div>
                            <InputSuggestion
                                InputValue={this.state.cardDeck}
                                fieldName = {"Deck"}
                                dataArray ={this.state.decks}
                                updateInputValue = {this.updateCardDeck}
                            />                 
                            <button type="submit">Create Card</button>
                        </form>
                    </div>
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