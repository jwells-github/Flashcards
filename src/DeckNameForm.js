import React, {Component} from 'react'
import InputSuggestion from './InputSuggestion';
import { requestEditDeck } from './serverFetches';

class DeckNameForm extends Component {
        constructor(props){
        super(props);
        this.state = {
            cardDeck: this.props.cardDeck === undefined ? "" :  this.props.cardDeck,
            displayMergeWarning: false,
            displayCurrentNameWarning: false,
            errorEditingDeck: false,
        };
        this.updateCardDeck = this.updateCardDeck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideOverlay = this.hideOverlay.bind(this);
        this.editDeckName = this.editDeckName.bind(this);
    }
    
    updateCardDeck(value){
        this.setState({cardDeck:value, displayMergeWarning: false, displayCurrentNameWarning: false})
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.cardDeck === '') return;
        if(this.state.cardDeck === this.props.cardDeck){
            this.setState({displayCurrentNameWarning: true})
        }
        // Warn the user that the deckname is in use
        else if(this.props.decks.includes(this.state.cardDeck) && !this.state.displayMergeWarning){
            this.setState({displayMergeWarning: true})
        }
        else{
            this.editDeckName(this.props.cardDeck, this.state.cardDeck)
        }
    }

    editDeckName(oldDeckName, newDeckName){
        this.setState({errorEditingDeck: false}, () =>{
            requestEditDeck(oldDeckName, newDeckName).then(response => {
                    if(response.success){   
                        this.props.editDeckName(oldDeckName, newDeckName)
                        this.props.hideOverlay()
                    }
                    else{
                        this.setState({errorEditingDeck: true})
                    }
                });
        });
    }

    hideOverlay(event){
        if(event.target === event.currentTarget){
            this.props.hideOverlay()
            this.setState({
                cardDeck: this.props.cardDeck,
                displayMergeWarning: false,
                displayCurrentNameWarning: false
            })
        }
    }

    getFormWarning(){
        if(this.state.displayMergeWarning){
            return  <div className="formWarning">
                        <h1>Warning:</h1>
                        <span>A deck with that name already exists, this deck will be merged with the existing deck</span>
                        <span>Submit to procceed</span>
                    </div>
        }
        else if(this.state.displayCurrentNameWarning){
            return  <div className="formWarning">
                        <h1>Warning:</h1>
                        <span>This deck already has that name</span>
                    </div>
        }
    }

    getSubmissionError(){
        if(this.state.errorEditingDeck){
            return <div>
                        <h1>Warning:</h1>
                        <span>There was an error processing your request, please try again</span>
                   </div>
        }
    }
    
    render(){
        return(
            <div className="flashcardForm">
                <button onClick={this.props.hideOverlay}>hide</button>  
                <form onSubmit={this.handleSubmit}>
                    <InputSuggestion
                        InputValue={this.state.cardDeck}
                        fieldName ={"Deck"}
                        dataArray={this.props.decks}
                        updateInputValue = {this.updateCardDeck}
                    />                 
                    <button className="flashcardSubmitButton" type="submit">Submit Card</button>
                    {this.getFormWarning()}
                    {this.getSubmissionError()}
                </form>
            </div>
        )
    }
}

export default DeckNameForm;