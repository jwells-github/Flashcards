import React, {Component} from 'react'
import FlashcardForm from './FlashcardForm';


class DeckView extends Component {
    constructor(props){
        super(props);
        this.state = {
            filteredData: [],
            InputValue: '',
            selectedSuggestion: 0,
            showEditForm: false,
            cardToEdit: {},
            cardEditedSuccessfully: undefined
        };
        this.deleteCard = this.deleteCard.bind(this);
        this.editCard =  this.editCard.bind(this);  
        this.setEditCard = this.setEditCard.bind(this);
    }

    
    componentDidMount(){
        window.history.pushState({}, document.title)
        window.onpopstate = this.props.exitDeckView;
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
    displayEditForm(card){
        this.setState({
            showEditForm: true,
            cardToEdit: card
        })
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
            showEditForm: true,
            cardToEdit: card
        })
    }

    render(){
        let editForm;
        if(this.state.showEditForm){
            editForm =
            <FlashcardForm
            decks={this.props.decks} 
            returnCard={this.editCard}
            cardHandlingSuccess={this.state.cardEditedSuccessfully}
            cardFront={this.state.cardToEdit.cardFront}
            cardBack={this.state.cardToEdit.cardBack}
            cardDeck ={this.state.cardToEdit.cardDeck}/>
        }
        return(
        <div className="">
            <span onClick={this.props.exitDeckView}>Back</span>
            <table>
                <thead>
                    <tr>    
                        <th>Front</th>
                        <th>Back</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cards.map((card,index) =>
                        <tr key={index}>
                            <td>{card.cardFront}</td>
                            <td>{card.cardBack}</td>
                            <td>{card.dateCreated}</td>
                            <td><span onClick={()=>this.setEditCard(card)}>Edit</span></td>
                            <td><span onClick={()=>this.deleteCard(card)}>Delete</span></td>
                            <td>{card._id}</td>
                        </tr>
                    )}  
                </tbody>
            </table>
            {editForm}
        </div>  
        )
    }
}

export default DeckView;