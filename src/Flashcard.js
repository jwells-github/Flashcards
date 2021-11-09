import React, {Component} from 'react'

class Flashcard extends Component {

    constructor(props){
        super(props);
        this.state = {  
            showCardReverse: false,
            actionTaken: false,
        };
        this.flipCard = this.flipCard.bind(this);
        this.handleCardResult = this.handleCardResult.bind(this);
    }

    flipCard(){
        this.setState(prevState => ({
            showCardReverse: !prevState.showCardReverse,
            actionTaken: true
    }));
    }   
    
    handleCardResult(answeredCorrectly){
        if(this.state.actionTaken){
            this.setState({showCardReverse: false, actionTaken: false})
            this.props.handleCardResult(answeredCorrectly)
        }
    }
    render(){
        return(
            <div className="cardContainer">
                <div className="flashCard" onClick={this.flipCard}>
                    <span className="cardInfo">{!this.state.showCardReverse ? "Front" : "Back"}</span>
                    <span className="cardText">{!this.state.showCardReverse ?  this.props.card.cardFront : this.props.card.cardBack}</span>
                    <span className="cardInfo">{!this.state.showCardReverse ? "Click to reveal back" : "Click to show front"}</span>
                </div>
                <div className={this.state.actionTaken ? "cardButtons leftCardButton" : "cardButtons leftCardButton buttonInactive"}>
                    <button className="buttonIncorrect" onClick={() => this.handleCardResult(false)}>Incorrect</button>
                </div>
                <div className={this.state.actionTaken ? "cardButtons" : "cardButtons buttonInactive"}>
                    <button className="buttonCorrect" onClick={() => this.handleCardResult(true)}>Correct</button>
                </div>
            </div>
        )
    }
}

export default Flashcard;