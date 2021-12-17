import React, {Component} from 'react'
import InputSuggestion from './InputSuggestion';

class DeckNameForm extends Component {
        constructor(props){
        super(props);
        this.state = {
            cardDeck: this.props.cardDeck,
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
        else if(this.props.decks.includes(this.state.cardDeck) && !this.state.displayMergeWarning){
            this.setState({displayMergeWarning: true})
        }
        else{
            this.props.hideOverlay()
            this.editDeckName(this.props.cardDeck, this.state.cardDeck)
        }
    }

    editDeckName(oldDeckName, newDeckName){
        this.setState({errorEditingDeck: false}, () =>{
            fetch("/deck/edit",{
                method: 'POST',   
                withCredentials: true,
                credentials: 'include',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({oldDeckName: oldDeckName, newDeckName: newDeckName }) 
                }).then(response => response.json()).then(response => {
                    if(response.success){   
                        this.props.editDeckName(oldDeckName, newDeckName)
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
    render(){
        let mergeWarning = this.getFormWarning();
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
                    {mergeWarning}
                </form>
            </div>
        )
    }
}

export default DeckNameForm;