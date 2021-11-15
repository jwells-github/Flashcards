import React, {Component} from 'react'
import InputSuggestion from './InputSuggestion';

class FlashcardForm extends Component {
        constructor(props){
        super(props);
        this.state = {
            cardFront: this.props.cardFront === undefined ? '' : this.props.cardFront,
            cardBack: this.props.cardBack  === undefined ? '' : this.props.cardBack,
            cardDeck: this.props.cardDeck  === undefined ? '' : this.props.cardDeck,
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateCardDeck = this.updateCardDeck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideOverlay = this.hideOverlay.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.cardHandlingSuccess !== prevProps.cardHandlingSuccess) {
            if(this.props.cardHandlingSuccess === true){
                this.setState({
                    cardFront: '',
                    cardBack: '',
                    cardDeck: ''
                })
            }
        }
      }
    
    
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    updateCardDeck(value){
        this.setState({cardDeck:value})
    }
    handleSubmit(event){
        event.preventDefault();
        if(this.state.cardFront === '' || this.state.cardBack === '' || this.state.cardDeck === '') return;
        this.props.hideOverlay()
        this.props.returnCard(this.state.cardFront,this.state.cardBack,this.state.cardDeck)
    }

    hideOverlay(event){
        if(event.target === event.currentTarget){
            this.props.hideOverlay()
        }
    }
    render(){
        return(
        <div  className={this.props.displayForm ? "flashcardOverlay" : "hide"} onClick={this.hideOverlay}>
            <form className="flashcardForm" onSubmit={this.handleSubmit}>
                <button onClick={this.props.hideOverlay}>hide</button>
                <div className="formField">
                    <label htmlFor="cardFront">Front Text:</label>
                    <input name="cardFront" type="text" value={this.state.cardFront} onChange={this.handleChange}/>
                </div>
                <div className="formField">
                    <label htmlFor="cardBack">Back Text:</label>
                    <input name="cardBack" type="text" value={this.state.cardBack} onChange={this.handleChange}/>
                </div>
                <InputSuggestion
                    InputValue={this.state.cardDeck}
                    fieldName ={"Deck"}
                    dataArray={this.props.decks}
                    updateInputValue = {this.updateCardDeck}
                />                 
                <button className="flashcardSubmitButton" type="submit">Submit Card</button>
            </form>
        </div>
        )
    }
}

export default FlashcardForm;