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