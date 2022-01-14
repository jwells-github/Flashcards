import React, {Component} from 'react'
import './Styles/DeckView.css';
import DeckNameForm from './DeckNameForm';
import FlashcardForm from './FlashcardForm';
import ScreenOverlay from './ScreenOverlay';


class DeckDetailView extends Component {
    constructor(props){
        super(props);
        this.state = {
            filteredData: [],
            InputValue: '',
            searchFilter: '',
            selectedSuggestion: 0,
            cardToEdit: {},
            displayEditCardForm: false,
            displayEditDeckNameForm: false,
            displayCreateCardForm: false,
        };
        this.deleteCard = this.deleteCard.bind(this);
        this.editCard =  this.editCard.bind(this);  
        this.displayEditCardForm = this.displayEditCardForm.bind(this);
        this.displayEditDeckNameForm = this.displayEditDeckNameForm.bind(this);
        this.displayCreateCardForm = this.displayCreateCardForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    
    componentDidMount(){
        window.history.pushState({}, document.title)
        window.onpopstate = this.props.exitView;
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    deleteCard(card){
        if(window.confirm("Are you sure you want to delete this card?\r\n" + card.cardFront + "\r\n" + card.cardBack)){
            fetch("/flashcards/delete",{
                method: 'POST',
                withCredentials: true,
                credentials: 'include',
                headers:{
                  'Accept': 'application/json',
                  'Content-Type':'application/json'
                },
                body: JSON.stringify({cardId: card._id})
            }).then(response => response.json()).then(response => this.handleDeleteResponse(response, card._id));
        }
    }
    handleDeleteResponse(response, cardId){
        if(response.success){
            this.props.removeFlashcard(cardId)
        }
        else{
            alert(response.message);
        }
    }   

    editCard(cardFront, cardBack, cardDeck){
        fetch("/flashcards/edit",{
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers:{
              'Accept': 'application/json',
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
                cardId: this.state.cardToEdit._id,
                cardFront: cardFront,
                cardBack: cardBack,
                cardDeck: cardDeck    
            })
        }).then(response => response.json()).then(response => this.handleEditResponse(response, this.state.cardToEdit._id));
    }
    handleEditResponse(response, cardId){
        if(response.success){
            this.props.editFlashcard(cardId,response.card)
            this.setState({
                showEditForm: false,
                cardToEdit: {},
            })
        }
        else{
            alert(response.message);
        }
    }
    displayEditCardForm(card){
        this.setState({
            displayEditCardForm: true,
            cardToEdit: card,
        })
    }
    displayEditDeckNameForm(){
        this.setState({displayEditDeckNameForm: true});
    }
    displayCreateCardForm(){
        this.setState({displayCreateCardForm: true})
    }
    hideForm(){
        this.setState({
            displayEditCardForm:false,
            cardToEdit: {},
            displayEditDeckNameForm:false,
            displayCreateCardForm: false,
        })
    }

    render(){
        return(
        <div className='deckView'>
            <h1>{this.props.isDisplayingAllDecks ? "All Decks" :this.props.cards[0].cardDeck}</h1>
            <div className="deckViewOptions">
                <button onClick={this.props.playDeck}>Play Deck</button>
                <button onClick={this.displayCreateCardForm}>Add a card</button>
                <input className="largeSearchbar" placeholder="Search..." onChange={this.handleChange} name="searchFilter" type="text"></input>
                <button onClick={this.displayEditDeckNameForm}>Rename Deck</button>
                <button>Delete Deck</button>
            </div>
            <table className="deckViewTable">
                <thead> 
                    <tr>    
                        <th className="colCardFront">Card Front</th>
                        <th className="colCardBack">Card Back</th>
                        {this.props.isDisplayingAllDecks ? <th className='colCardDeck'>Deck</th> : ""}
                        <th className='colCardDate'>Created Date</th>
                        <th className='colCardAction'></th>
                        <th className='colCardAction'></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cards.filter(card =>
                        card.cardFront.match(new RegExp(this.state.searchFilter,"g")) ||
                        card.cardBack.match(new RegExp(this.state.searchFilter,"g")))
                        .map((card,index) =>
                            <tr key={index}>
                                <td className='colCardFront'>{card.cardFront}</td>
                                <td className='colCardBack'>{card.cardBack}</td>
                                {this.props.isDisplayingAllDecks ? <td className='colCardDeck' title={card.cardDeck}>{card.cardDeck}</td> : ""}
                                <td className='colCardDate'>{new Date(card.dateCreated).toLocaleDateString('en-GB')}</td>
                                <td className='colCardAction tableAction'><span onClick={()=>this.displayEditCardForm(card)}>Edit</span></td>
                                <td className='colCardAction tableAction'><span onClick={()=>this.deleteCard(card)}>Delete</span></td>
                            </tr>
                    )}  
                </tbody>
            </table>
            <ScreenOverlay hideOverlay = {this.hideForm} displayOverlay = {this.state.displayEditCardForm}>
                <FlashcardForm
                    hideOverlay={this.hideForm}
                    decks={this.props.decks.map(deck => deck.deckName)} 
                    returnCard={this.editCard}
                    cardFront={this.state.cardToEdit.cardFront}
                    cardBack={this.state.cardToEdit.cardBack}
                    cardDeck={this.state.cardToEdit.cardDeck}/>
            </ScreenOverlay>
            <ScreenOverlay hideOverlay = {this.hideForm} displayOverlay = {this.state.displayEditDeckNameForm}>
                <DeckNameForm
                    hideOverlay={this.hideForm}
                    decks={this.props.decks.map(deck => deck.deckName)} 
                    editDeckName={this.props.editDeckName}
                    cardDeck={this.props.cards[0].cardDeck}
                />
            </ScreenOverlay>
            <ScreenOverlay hideOverlay={this.hideForm} displayOverlay = {this.state.displayCreateCardForm}>
                <FlashcardForm
                        hideOverlay={this.hideForm}
                        decks={this.props.decks.map(deck => deck.deckName)} 
                        returnCard={this.props.createFlashcard}
                        cardDeck={this.props.cards[0].cardDeck}/>    
            </ScreenOverlay>               
        </div>  
        )
    }
}

export default DeckDetailView;