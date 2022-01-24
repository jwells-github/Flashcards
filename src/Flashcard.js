import React, {Component} from 'react'
import './Styles/Flashcard.css';
class Flashcard extends Component {
    constructor(props){
        super(props);
        this.state = {  
            showCardReverse: false,
            actionTaken: false,
            dragStartX: 0,
            draggingCard: false,
            initialCardCentre: 0,
            commitedToDragging: false,
            cardFlipped: false,
        };
        this.flipCard = this.flipCard.bind(this);
        this.handleCardResult = this.handleCardResult.bind(this);
        this.dragCard = this.dragCard.bind(this);
        this.stopDragging = this.stopDragging.bind(this);
        this.FlashCardRef = React.createRef();
    }

    componentWillUnmount(){
        document.removeEventListener("mouseup", this.stopDragging);
    }

    flipCard(){
        if(this.state.commitedToDragging){
            this.setState({commitedToDragging : false})
            return;
        }
        this.setState(prevState => ({
            showCardReverse: !prevState.showCardReverse,
            cardFlipped: !prevState.cardFlipped,
            actionTaken: true
        }));
    }   
    
    handleCardResult(answeredCorrectly){
        if(this.state.actionTaken){
            this.setState({showCardReverse: false, actionTaken: false, cardFlipped: false})
            this.props.handleCardResult(answeredCorrectly)
        }   
    }

    dragCard(event){
        if(!this.state.actionTaken){
            return
        }
        this.setState({
            dragStartX : event.screenX, 
            draggingCard: true, 
            initialCardCentre : event.currentTarget.getBoundingClientRect().x + (event.currentTarget.offsetWidth / 2)
        })
        this.dragTimer = setTimeout(() =>{
            if(this.state.draggingCard){
                this.setState({commitedToDragging: true});
            }
        }, 150 )
        document.addEventListener("mouseup", this.stopDragging);
    }

    stopDragging(){
        clearTimeout(this.dragTimer);
        let initialCardCentre = this.state.initialCardCentre;
        let currentCardCentre = this.FlashCardRef.current.getBoundingClientRect().x + (this.FlashCardRef.current.offsetWidth / 2);
        this.setState({dragStartX : 0, draggingCard: false})
        if(!this.state.commitedToDragging){
            return;
        }
        // Swiping the card left 
        if(currentCardCentre <= initialCardCentre - (initialCardCentre / 3)){
            this.handleCardResult(false)
        }
        // Swiping the card right
        if(currentCardCentre >= initialCardCentre + (initialCardCentre / 3)){
            this.handleCardResult(true)
        }
        document.removeEventListener("mouseup", this.stopDragging);
        // prevent onClick from being fired if the cursor is released over the cover
        setTimeout(() =>{
            this.setState({commitedToDragging : false})
        }, 100);
    }
    
    render(){
        let translateX = 0;
        if(this.state.draggingCard){
            translateX = this.props.mouseX - this.state.dragStartX
        }
        let translateStyle = "translateX(" + translateX + "px)"
        let flashCardInnerClass = "flashcardInner "
        if(this.state.cardFlipped){
            flashCardInnerClass += "flashcardInnerFlip"
        }
        return(
            <div className="flashcardView">
                <div className="maskLevel">
                    <div className="mask"></div>
                        <div className="cardContainer">
                            <div className="flashcard" ref={this.FlashCardRef}  style={{transform: translateStyle}} onMouseDown={this.dragCard} onClick={this.state.commitedToDragging ? null : this.flipCard}>
                                <div data-testid='flashcardInner' className={flashCardInnerClass}>
                                    <div className="cardFront" >
                                        <span className="cardInfo">Front</span>
                                        <span className="cardText">{this.props.card.cardFront}</span>
                                        <span className="cardInfo">Click to reveal back</span>
                                    </div>
                                    <div className="cardReverse">
                                        <span className="cardInfo">Back</span>
                                        <span className="cardText">{this.props.card.cardBack}</span>
                                        <span className="cardInfo">Click to show front</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flashcardButtons">
                                <div data-testid='buttonIncorrectDiv' className={this.state.actionTaken ? "" : "buttonInactive"}>
                                        <button className="buttonIncorrect" onClick={() => this.handleCardResult(false)}>Incorrect</button>
                                </div>
                                <div data-testid='buttonCorrectDiv' className={this.state.actionTaken ? "" : " buttonInactive"}>
                                    <button className="buttonCorrect" onClick={() => this.handleCardResult(true)}>Correct</button>
                                </div>
                            </div>
                        </div>
                    <div className="mask"></div>
                </div>
            </div>
        )
    }
}

export default Flashcard;