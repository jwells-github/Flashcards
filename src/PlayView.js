import React, {Component} from 'react'

class PlayView extends Component{
    constructor(props){
        super(props);
        this.state = {  
            cardsInPlay: this.getShuffledCards(this.props.cards),
            cardsToBeReplayed: [],
            positionInCards: 0,
            showCardReverse: false,
            actionTaken: false,
            displayEndDialogue: false,
            correctGuesses: 0,
            incorrectGuesses: 0,
        };
        this.flipCard = this.flipCard.bind(this);
        this.cardResult = this.handleCardResult.bind(this);
        this.handleEndOfCards = this.handleEndOfCards.bind(this);
        this.resetPlayView = this.resetPlayView.bind(this);
    }

    componentDidMount(){
        window.history.pushState({}, document.title)
        window.onpopstate = this.props.exitView;
    }
    
    getShuffledCards(cards){
        let shuffledCards = cards
        let currentPosition = shuffledCards.length; 
        while(currentPosition !== 0){
            let randomPosition = Math.floor(Math.random() * currentPosition);
            currentPosition -= 1;
            let currentCard = shuffledCards[currentPosition]
            // Swap the position of the cards
            shuffledCards[currentPosition] = shuffledCards[randomPosition];
            shuffledCards[randomPosition] = currentCard;
        }
        return shuffledCards;
    }

    flipCard(){
        this.setState(prevState => ({
            showCardReverse: !prevState.showCardReverse,
            actionTaken: true
        }));
    }
    
    handleEndOfCards(){
        if(this.state.cardsToBeReplayed.length < 1){
            this.setState({displayEndDialogue: true})
        }
        else{
            this.setState({
                cardsInPlay: this.getShuffledCards(this.state.cardsToBeReplayed),
                cardsToBeReplayed: [],
                positionInCards: 0,
                showCardReverse: false,
                actionTaken: false,
            })
        }
    }

    handleCardResult(answeredCorrectly){
        let finalCard = this.state.positionInCards === this.state.cardsInPlay.length -1;
        let cardsToBeReplayed = answeredCorrectly ? this.state.cardsToBeReplayed : [...this.state.cardsToBeReplayed, this.state.cardsInPlay[this.state.positionInCards]];
        this.setState(prevState => ({
            positionInCards: prevState.positionInCards += finalCard ? 0 : 1,
            showCardReverse: false,
            actionTaken: false,
            cardsToBeReplayed: cardsToBeReplayed,
            correctGuesses: prevState.correctGuesses += answeredCorrectly? 1 : 0,
            incorrectGuesses: prevState.incorrectGuesses += answeredCorrectly? 0 : 1,
        }),() =>{
            if(finalCard){
                this.handleEndOfCards()
            }
        })
    }

    resetPlayView(){
        this.setState({
            cardsInPlay: this.getShuffledCards(this.props.cards),
            cardsToBeReplayed: [],
            positionInCards: 0,
            showCardReverse: false,
            actionTaken: false,
            displayEndDialogue: false,
            correctGuesses: 0,
            incorrectGuesses: 0,
        })
    }
    render(){
        
        if(this.state.displayEndDialogue){
            let answerAccuracy =  (this.state.correctGuesses / (this.state.correctGuesses + this.state.incorrectGuesses)) * 100
            return(
                <div>
                    <button onClick={() => this.resetPlayView()}>Replay</button>
                    <button onClick={() => this.props.exitView()}>Exit</button>
                    <h1>{answerAccuracy}% of answers were correct </h1>

                </div>
            )
        }
        else{
            let card = this.state.cardsInPlay[this.state.positionInCards]
            return(
                <div className="playView">
                    <div className="flashCard" onClick={this.flipCard}>
                        <span>{!this.state.showCardReverse ? "front" : "back"}</span>
                        <h1>{!this.state.showCardReverse ?  card.cardFront : card.cardBack}</h1>
                    </div>
                    <div className="cardButtons">
                        <button onClick={() => this.handleCardResult(false)}>Incorrect</button>
                        <button onClick={() => this.handleCardResult(true)}>Correct</button>
                    </div>
                    <h2>{this.state.cardsInPlay.length - this.state.positionInCards + this.state.cardsToBeReplayed.length} Cards remaining</h2>
                </div>  
            )
        }

    }
}

export default PlayView;