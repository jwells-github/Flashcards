import React, {Component} from 'react'
import InputSuggestion from './InputSuggestion';

class FlashcardForm extends Component {
        constructor(props){
        super(props);
        this.state = {
            cardFront: this.props.cardFront === undefined ? "" :  this.props.cardFront,
            cardBack: this.props.cardBack === undefined ? "" :  this.props.cardBack,
            cardDeck: this.props.cardDeck === undefined ? "" :  this.props.cardDeck,
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateCardDeck = this.updateCardDeck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(this.props.cardFront !== prevProps.cardFront){
            this.setState({cardFront: this.props.cardFront === undefined ? '' : this.props.cardFront})
        }
        if(this.props.cardBack !== prevProps.cardBack){
            this.setState({cardBack: this.props.cardBack === undefined ? '' : this.props.cardBack})
        }
        if(this.props.cardDeck !== prevProps.cardDeck){
            this.setState({cardDeck: this.props.cardDeck === undefined ? '' : this.props.cardDeck})
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
        this.props.returnCard(this.state.cardFront,this.state.cardBack,this.state.cardDeck)
        this.setState({cardFront: '', cardBack: '', cardDeck: ''})
        this.props.hideOverlay()
    }

    render(){
        return(
            <form className="flashcardForm" onSubmit={this.handleSubmit}>
                <span className='hideFormButton' onClick={this.props.hideOverlay}>X</span>
                <div className="formField">
                    <label htmlFor="cardFront">Front Text:</label>
                    <textarea aria-label="cardFrontField" autoFocus name="cardFront" type="text" value={this.state.cardFront} onChange={this.handleChange}/>
                </div>
                <div className="formField">
                    <label htmlFor="cardBack">Back Text:</label>
                    <textarea aria-label="cardBackField" name="cardBack" type="text" value={this.state.cardBack} onChange={this.handleChange}/>
                </div>
                <InputSuggestion
                    InputValue={this.state.cardDeck}
                    fieldName ={"Deck"}
                    dataArray={this.props.decks}
                    updateInputValue = {this.updateCardDeck}
                />                 
                <button className="flashcardSubmitButton" type="submit">Submit Card</button>
            </form>
        )
    }
}

export default FlashcardForm;