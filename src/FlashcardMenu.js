import React, {Component} from 'react'
import DeckDetailView from './DeckDetailView';
import PlayView from './PlayView';
import DeckList from './DeckList';
import { requestCreateFlashcard, requestFlashcards } from './serverFetches';

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
        if(this.props.inGuestMode === false){
            requestFlashcards().then(response => {
                this.setState({
                    flashcards: response.flashcards,
                    decks: this.getDeckNames(response.flashcards)
                });
            });
        }
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
    removeFlashcard(removedCard){
        let filteredFlashcards = this.state.flashcards.filter(card => !card._id.match(removedCard._id));
        this.setState({
            flashcards: filteredFlashcards,
            decks: this.getDeckNames(filteredFlashcards)
        }, () =>{
            if(this.state.deckSelected){
                // Update DeckDetailView
                if(this.state.allCardsSelected){
                    this.setState({selectedCards: this.state.flashcards})
                }
                else{
                    this.selectDeck(removedCard.cardDeck)
                }
            }
        })
    }

    editFlashcard(cardId, card){
        let allCards = this.state.flashcards.slice();
        let AllCardsindex = allCards.findIndex(card => card._id.match(cardId));
        allCards[AllCardsindex] = card
        let selectedCards = this.state.selectedCards.slice();
        let selectedCardsIndex = selectedCards.findIndex(card => card._id.match(cardId));
        selectedCards[selectedCardsIndex] = card
        this.setState({flashcards: allCards, selectedCards: selectedCards, decks:this.getDeckNames(allCards)})
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    addFlashcard(card){
        this.setState(prevState => ({
            flashcards: [...prevState.flashcards, card],
            decks: this.getDeckNames([...prevState.flashcards, card]),
        }), () =>{
            if(this.state.deckSelected){
                // Update DeckDetailView
                if(this.state.allCardsSelected){
                    this.setState({selectedCards: this.state.flashcards})
                }
                else{
                    this.selectDeck(card.cardDeck)
                }
            }
        });

    }
    createFlashcard(cardFront, cardBack, cardDeck){
        if(this.props.inGuestMode === false){
            requestCreateFlashcard(cardFront,cardBack,cardDeck).then(response => 
                this.addFlashcard(response));
        }
        else{
            this.addFlashcard({
                _id: String((Date.now() + Math.random())), // likely a unique id
                cardFront: cardFront,
                cardBack: cardBack,
                cardDeck: cardDeck,
                dateCreated: Date.now()
            });
        }
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
                    inGuestMode={this.props.inGuestMode}
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