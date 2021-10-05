import React, {Component} from 'react'


class DeckView extends Component {
    constructor(props){
        super(props);
        this.state = {
            filteredData: [],
            InputValue: '',
            selectedSuggestion: 0,
        };
        this.deleteCard = this.deleteCard.bind(this);
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
      render(){
          return(
            <div className="">
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
                                <td><span>Edit</span></td>
                                <td><span onClick={()=>this.deleteCard(card)}>Delete</span></td>
                                <td>{card._id}</td>
                            </tr>
                        )}  
                    </tbody>

                </table>
  
            </div>  
          )
      }
}

export default DeckView;