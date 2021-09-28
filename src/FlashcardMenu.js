import React, {Component} from 'react'
import InputSuggestion from './InputSuggestion';
class FlashcardMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            flashcards: [],
            decks: [],
            filteredDecks: [],
            cardFront: '',
            cardBack: '',
            cardDeck: '',
            selectedSuggestion: 0,
        };
        this.createFlashcard = this.createFlashcard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateCardDeck = this.updateCardDeck.bind(this);
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
                    decks: [...new Set(response.flashcards.map(card => card.cardDeck))] 
                });
                
            });
        
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
    render(){
          return(
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
                        fieldName = {"Deck"}
                        dataArray ={this.state.decks}
                        returnValue = {this.updateCardDeck}
                    />                 
                    <button type="submit">Create Card</button>
                </form>
                {this.state.decks}
            </div>
          )
      }
}

export default FlashcardMenu;