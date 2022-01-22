import React, {Component} from 'react'
import DeckSortOptions from './DeckSortOptions';
import FlashcardForm from './FlashcardForm';
import ScreenOverlay from './ScreenOverlay';

class DeckList extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayCardForm: false,
            searchFilter: ''
        };
        this.hideFlashcardForm = this.hideFlashcardForm.bind(this);
        this.showFlashcardForm = this.showFlashcardForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    hideFlashcardForm(){
        this.setState({displayCardForm:false})
    }
    showFlashcardForm(){
        this.setState({displayCardForm:true})
    }

    
    render(){
        return(
            <div className="deckList">
                <ScreenOverlay hideOverlay={this.hideFlashcardForm} displayOverlay={this.state.displayCardForm}>
                    <FlashcardForm
                        hideOverlay={this.hideFlashcardForm}
                        decks={this.props.decks.map(deck => deck.deckName)} 
                        returnCard={this.props.createFlashcard}
                    />
                </ScreenOverlay>
                <div className="deckContainer">
                    <div className="decks">
                        <div className="deckOptions">
                            <button onClick={this.showFlashcardForm}>Add a flashcard</button>
                            <button onClick={this.props.playAllCards}>Play All</button>
                            <button onClick={this.props.enterDeckDetialViewAllCards}>View All</button>
                            <input className="largeSearchbar" aria-label="deckSearch" placeholder="Search..." onChange={this.handleChange} name="searchFilter" type="text"></input>
                            <DeckSortOptions 
                                decks={this.props.decks}
                                returnDecks={this.props.updateDecks}
                            />
                        </div>
                        {this.props.decks.filter(deck => deck.deckName.match(new RegExp(this.state.searchFilter,"g"))).map((deck,index) =>
                            <div className="deck" key={index}>
                                <h1>{deck.deckName}</h1>
                                <span>{deck.count} {deck.count > 1 ? "cards" : "card"}</span>
                                <div>
                                    <button onClick={() => this.props.playDeck(deck.deckName)}>Play Deck</button>
                                    <button onClick={() => this.props.enterDeckDetailView
                            (deck.deckName)}>Edit Deck</button> 
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default DeckList; 