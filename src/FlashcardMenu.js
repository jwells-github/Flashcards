import React, {Component} from 'react'
import DeckDetailView from './DeckDetailView';
import PlayView from './PlayView';
import DeckList from './DeckList';

class FlashcardMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            flashcards: [],
            decks: [],
            searchFilter: '',
            playMode: false,
            inDeckDetailView: false,
            deckSelected: false,
            selectedCards: [],
            allCardsSelected: false,
        };
        this.createFlashcard = this.createFlashcard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateCardDeck = this.updateCardDeck.bind(this);
        this.removeFlashcard = this.removeFlashcard.bind(this);
        this.editFlashcard = this.editFlashcard.bind(this);
        this.exitDeckDetailView = this.exitDeckDetailView.bind(this);
        this.exitPlayView = this.exitPlayView.bind(this);
        this.playDeck = this.playDeck.bind(this);
        this.playAllCards = this.playAllCards.bind(this);

        this.enterDeckDetailView = this.enterDeckDetailView.bind(this);
        this.enterDeckDetialViewAllCards= this.enterDeckDetialViewAllCards.bind(this);
        this.editDeckName = this.editDeckName.bind(this);
        this.updateDecks = this.updateDecks.bind(this);
    }

    componentDidMount(){
        fetch('/flashcards/get',{
            withCredentials: true,
            credentials: 'include'
          })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    flashcards: response.flashcards,
                    decks: this.getDeckNames(response.flashcards)
                });
            });
    }

    getDeckNames(flashcards){
        let deckNames = [...new Set(flashcards.map(card => card.cardDeck))];
        let decks = [];
        deckNames.forEach(deckName => {
            let numberOfCardsInDeck = flashcards.filter(card => card.cardDeck === deckName).length;
            decks.push({deckName: deckName, count: numberOfCardsInDeck});
        });
        return decks;
    }

    editDeckName(currentName, newName){
        let editedFlashcards = this.state.flashcards.map(card =>{
            if (card.cardDeck === currentName){
                card.cardDeck = newName;
            }
            return card;
        })
        this.setState({flashcards: editedFlashcards, decks:this.getDeckNames(editedFlashcards)})
    }
    removeFlashcard(cardId){
        let filteredFlashcards = this.state.flashcards.filter(card => !card._id.match(cardId));
        this.setState({
            flashcards: filteredFlashcards,
            decks: this.getDeckNames(filteredFlashcards)
        })
    }

    editFlashcard(cardId, card){
        console.log(card)
        console.log(cardId)
        console.log()
        let allCards = this.state.flashcards.slice();
        let AllCardsindex = allCards.findIndex(card => card._id.match(cardId));
        console.log(allCards[AllCardsindex]) 
        allCards[AllCardsindex] = card
        let selectedCards = this.state.selectedCards.slice();
        let selectedCardsIndex = selectedCards.findIndex(card => card._id.match(cardId));
        console.log(selectedCards[selectedCardsIndex])
        selectedCards[selectedCardsIndex] = card
        this.setState({flashcards: allCards, selectedCards: selectedCards})
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    addFlashcard(card){
        this.setState(prevState => ({
            flashcards: [...prevState.flashcards, card],
            decks: this.getDeckNames([...prevState.flashcards, card]),
        }));
        if(this.state.deckSelected){
            // Update DeckDetailView
            if(this.state.selectedCards.length){
                this.selectDeck(this.state.selectedCards[0].cardDeck)
            }
        }
    }

    createFlashcard(cardFront, cardBack, cardDeck){
        fetch("/flashcards/create",{
            method: 'POST',   
            withCredentials: true,
            credentials: 'include',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({cardFront: cardFront, cardBack: cardBack, cardDeck: cardDeck}) 
            }).then(response => response.json()).then(response => 
                this.addFlashcard(response));
    }
    updateCardDeck(value){
        this.setState({cardDeck:value})
    }
    updateSelectionInProgress(bool){
        this.setState({selectionInProgress :bool})
    }
    playDeck(deck = ""){
        if(deck.length > 0){
            this.selectDeck(deck)
        }
        this.setState({playMode: true})
    }
    enterDeckDetailView(deck){
        this.selectDeck(deck)
        this.setState({inDeckDetailView: true})
    }
    enterDeckDetialViewAllCards(){
        this.setState({
            selectedCards: this.state.flashcards, 
            inDeckDetailView: true, 
            deckSelected: true,
            allCardsSelected: true});
        this.props.showBackButton();
    }
    playAllCards(){
        this.setState({deckSelected: true, selectedCards: this.state.flashcards, playMode: true})
        this.props.showBackButton();
    }
    selectDeck(deck){
        this.setState({
            deckSelected: true, 
            selectedCards: this.state.flashcards.filter(card => card.cardDeck === deck)})
        this.props.showBackButton();
    }
    exitDeckDetailView(){
        this.setState({deckSelected: false, selectedCards: [], allCardsSelected: false, inDeckDetailView:false})
        this.props.hideBackButton();
    }
    exitPlayView(){
        if(this.state.inDeckDetailView){
            this.setState({playMode: false})
        }
        else{
            this.setState({deckSelected: false, selectedCards: [], playMode: false})
            this.props.hideBackButton();
        }
    }

    updateDecks(decks){
        this.setState({decks:decks})
    }   
    

    render(){
        if(this.state.playMode){
            return(
                <PlayView
                    cards={this.state.selectedCards}
                    exitView={this.exitPlayView}/>
            )
        }
        if(this.state.deckSelected){
            return(
                <DeckDetailView
                    cards={this.state.selectedCards}
                    removeFlashcard = {this.removeFlashcard}
                    editFlashcard={this.editFlashcard}
                    createFlashcard={this.createFlashcard}
                    decks={this.state.decks}
                    exitView={this.exitDeckDetailView}
                    playDeck={this.playDeck}
                    editDeckName={this.editDeckName}
                    isDisplayingAllDecks={this.state.allCardsSelected}
                />
            )
        }
        else{   
            return(
                <DeckList
                    decks={this.state.decks}
                    createFlashcard={this.createFlashcard}
                    updateDecks={this.updateDecks}
                    playAllCards={this.playAllCards}
                    enterDeckDetialViewAllCards={this.enterDeckDetialViewAllCards}
                    enterDeckDetailView={this.enterDeckDetailView}
                    playDeck={this.playDeck}/>
            )
        }

      }
}

export default FlashcardMenu;