import React, {Component} from 'react'
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
        this.updateSuggestions = this.updateSuggestions.bind(this);
        this.useSuggestion = this.useSuggestion.bind(this);
        this.handleSuggestionInput = this.handleSuggestionInput.bind(this);
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

    updateSuggestions(event){
        let cardDeck = event.target.value;
        let regex = cardDeck.length > 0 ? cardDeck+'.' : "";

        this.setState({ 
            [event.target.name]: event.target.value,
            selectedSuggestion: 0,
            filteredDecks : this.state.decks.filter(deck => deck.match(new RegExp(regex)))
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

    useSuggestion(suggestion){
        this.setState({
            cardDeck:suggestion,
            selectedSuggestion: 0,
            filteredDecks: []
        })
    }

    handleSuggestionInput(event){
        event.preventDefault();
        let downKey = event.key === "Down" || event.key === "ArrowDown"
        let upKey = event.key === "Up" || event.key === "ArrowUp"
        let enterKey = event.key === "Enter";
        if(downKey){
            if(this.state.filteredDecks.length <= this.state.selectedSuggestion){
                return;
            }
            this.setState(prevState =>({
                selectedSuggestion: prevState.selectedSuggestion +1
            }));
        }
        if(upKey){
            if(this.state.selectedSuggestion <= 0){
                return;
            }
            this.setState(prevState =>({
                selectedSuggestion: prevState.selectedSuggestion -1
            }));
        }
        if(enterKey){
            if(this.state.selectedSuggestion === 0 ){
                return;
            }
            console.log(this.state.filteredDecks)
            console.log(this.state.selectedSuggestion)
            this.useSuggestion(this.state.filteredDecks[this.state.selectedSuggestion -1] )
        }
    }
    render(){
        console.log(this.state.cardDeck)
        console.log(this.state.selectedSuggestion)
        console.log(this.state.filteredDecks);
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
                    <div className="formField">
                        <label htmlFor="cardDeck">Deck:</label>
                        <input onKeyUp={this.handleSuggestionInput} name="cardDeck" type="text" value={this.state.cardDeck} onChange={this.updateSuggestions} autoComplete="off"/>
                        <div className="formSuggestion">
                            {this.state.filteredDecks.map((deck, index) => 
                                <span
                                    key={index}
                                    id={this.state.selectedSuggestion === index + 1 ? "red" : ""}  
                                    value={deck} 
                                    onClick={() => this.useSuggestion(deck)}>{deck}
                                </span>)}
                        </div>
                    </div>                    
                    <button type="submit">Create Card</button>
                </form>
                {this.state.decks}
            </div>
          )
      }
}

export default FlashcardMenu;