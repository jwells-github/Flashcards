import React, {Component} from 'react'
class FlashcardMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            flashcards: [],
            decks: [],
            cardFront: '',
            cardBack: '',
            cardDeck: '',
        };
        this.createFlashcard = this.createFlashcard.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        console.log(this.state.flashcards)
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

    render(){
          return(
            <div className="entranceForm">
                <h2>Hi</h2>
                <form onSubmit={this.createFlashcard}>
                    <label htmlFor="cardFront">Front Text:</label>
                    <input name="cardFront" type="text" value={this.state.cardFront} onChange={this.handleChange}/>
                    <label htmlFor="cardBack">Back Text:</label>
                    <input name="cardBack" type="text" value={this.state.cardBack} onChange={this.handleChange}/>
                    <label htmlFor="cardDeck">Deck:</label>
                    <input name="cardDeck" type="text" value={this.state.cardDeck} onChange={this.handleChange}/>
                    <button type="submit">Create Card</button>
                </form>
                {this.state.decks}
            </div>
          )
      }
}

export default FlashcardMenu;