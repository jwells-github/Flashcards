import React, {Component} from 'react'

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
            actionTaken: true
        }));
    }   
    
    handleCardResult(answeredCorrectly){
        if(this.state.actionTaken){
            this.setState({showCardReverse: false, actionTaken: false})
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
        // prevent onClick from being fired if the cursor is released over the code
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

        return(
            <div className="flashcardView">
                <div className="maskLevel">
                    <div className="mask"></div>
                        <div className="cardContainer">
                            <div  className="flashcard" ref={this.FlashCardRef}  style={{transform: translateStyle}} onMouseDown={this.dragCard} onClick={this.state.commitedToDragging ? null : this.flipCard}>
                                <span className="cardInfo">{!this.state.showCardReverse ? "Front" : "Back"}</span>
                                <span className="cardText">{!this.state.showCardReverse ?  this.props.card.cardFront : this.props.card.cardBack}</span>
                                <span className="cardInfo">{!this.state.showCardReverse ? "Click to reveal back" : "Click to show front"}</span>
                            </div>
                            <div className="flashcardButtons">
                                <div className={this.state.actionTaken ? "" : "buttonInactive"}>
                                        <button className="buttonIncorrect" onClick={() => this.handleCardResult(false)}>Incorrect</button>
                                </div>
                                <div className={this.state.actionTaken ? "" : " buttonInactive"}>
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