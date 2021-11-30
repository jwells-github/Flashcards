import React, {Component} from 'react'
import FlashcardForm from './FlashcardForm';


class DeckView extends Component {
    constructor(props){
        super(props);
        this.state = {
            filteredData: [],
            InputValue: '',
            selectedSuggestion: 0,
            cardToEdit: {},
            displayEditCardForm: false,
        };
        this.deleteCard = this.deleteCard.bind(this);
        this.editCard =  this.editCard.bind(this);  
        this.setEditCard = this.setEditCard.bind(this);
        this.hideFlashcardForm = this.hideFlashcardForm.bind(this);
    }

    
    componentDidMount(){
        window.history.pushState({}, document.title)
        window.onpopstate = this.props.exitView;
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
                body: JSON.stringify({cardId: card._id, owner : card.owner})
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
                owner : this.state.cardToEdit.owner,
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
    setEditCard(card){
        this.setState({
            displayEditCardForm: true,
            cardToEdit: card,
        })
    }
    hideFlashcardForm(){
        this.setState({displayEditCardForm:false, cardToEdit: {}})
    }

    render(){
        console.log(this.props.cards)
        console.log(Date.parse(this.props.cards[0].dateCreated))
        console.log(typeof(Date.parse(this.props.cards[0].dateCreated)))
        return(
        <div>
            <span onClick={this.props.exitView}>Back</span>
            <table className="deckViewTable">
                <thead> 
                    <tr>    
                        <th className="colCardFront">Card Front</th>
                        <th className="colCardBack">Card Back</th>
                        <th className="colCreatedDate">Created Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cards.map((card,index) =>
                        <tr key={index}>
                            <td>{card.cardFront}</td>
                            <td>{card.cardBack}</td>
                            <td>{new Date(card.dateCreated).toLocaleDateString('en-GB')}</td>
                            <td><span onClick={()=>this.setEditCard(card)}>Edit</span></td>
                            <td><span onClick={()=>this.deleteCard(card)}>Delete</span></td>
                        </tr>
                    )}  
                </tbody>
            </table>
            <FlashcardForm
                hideOverlay = {this.hideFlashcardForm}
                displayForm = {this.state.displayEditCardForm}
                decks={this.props.decks.map(deck => deck.deckName)} 
                returnCard={this.editCard}
                cardFront={this.state.cardToEdit.cardFront}
                cardBack={this.state.cardToEdit.cardBack}
                cardDeck ={this.state.cardToEdit.cardDeck}/>
        </div>  
        )
    }
}

export default DeckView;