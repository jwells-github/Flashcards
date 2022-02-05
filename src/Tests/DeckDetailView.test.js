import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeckDetailView from '../DeckDetailView';

const testCards = [
    {
        _id: 1,
        cardFront: "What colour is the sky?",
        cardBack: "Blue",
        cardDeck: "Simple questions for simple people",
        dateCreated: Date.now(),
    },
    {
        _id: 2,
        cardFront: "What noise does a dog make?",
        cardBack: "Woof!",
        cardDeck: "Simple questions for simple people",
        dateCreated: Date.now(),
    },
    {
        _id: 3,
        cardFront: "How many sides does a triangle have?",
        cardBack: "Three",
        cardDeck: "Simple questions for simple people",
        dateCreated: Date.now(),
    },
    {
        _id: 4,
        cardFront: "How many studio albums did The Fall release?",
        cardBack: "Thirty one",
        cardDeck: "Fall trivia",
        dateCreated: Date.now(),
    }
];

const testDecks = [
    {deckName: 'Frog Facts', count: 99},
    {deckName: 'Fish Facts', count: 1},
    {deckName: 'Quail Questions', count: 10},
    {deckName: 'Iguana Inquerys', count: 2}, 
    {deckName: 'Simple questions for simple people', count: 3}
 ];

test('The deckname will be displayed as heading if isDsplayingAllDecks is false', ()=>{
    render(
        <DeckDetailView 
            isDisplayingAllDecks={false} 
            cards={testCards}
            decks={testDecks}/>
    );
    expect(screen.getByRole('heading', {name: testCards[0].cardDeck})).toBeTruthy();
    expect(screen.queryByRole('heading', {name: 'All Decks'})).not.toBeTruthy();
});

test(' "All Decks" will be displayed as heading if isDsplayingAllDecks is true', ()=>{
    render(
        <DeckDetailView 
            isDisplayingAllDecks={true} 
            cards={testCards}
            decks={testDecks}/>
    );
    expect(screen.getByRole('heading', {name: 'All Decks'})).toBeTruthy();
    expect(screen.queryByRole('heading', {name: testCards[0].cardDeck})).not.toBeTruthy();
});

test('clicking Play Deck will call this.props.playDeck', ()=>{
    let playDeckCalled = false;
    render(
        <DeckDetailView 
            cards={testCards}
            decks={testDecks}
            playDeck={()=>playDeckCalled = true}
         />
    );
    userEvent.click(screen.getByRole('button', {name: 'Play Deck'}));
    expect(playDeckCalled).toBeTruthy();
}); 

test('clicking Add a card will display the card form', ()=>{
    render(
        <DeckDetailView 
            cards={testCards}
            decks={testDecks}
         />
    );
    expect(screen.queryByRole('button', {name: 'Submit Card'})).toBeNull();
    userEvent.click(screen.getByRole('button', {name: 'Add a card'}));
    expect(screen.getByRole('button', {name: 'Submit Card'})).toBeTruthy();
});


test('typing in the searchbar filters the decklist by Cardfront text', () =>{
    render(
        <DeckDetailView 
            cards={testCards}
            decks={testDecks}
         />
    );
    let searchTerm = 'many';
    let searchBox = screen.getByRole('textbox', {name: 'deckSearch'});
    userEvent.type(searchBox , searchTerm);
    expect(screen.getByRole('cell', {name: testCards[2].cardFront})).toBeTruthy();
    expect(screen.getByRole('cell', {name: testCards[3].cardFront})).toBeTruthy();
    expect(screen.queryByRole('cell', {name: testCards[0].cardFront})).toBeNull();
});

test('typing in the searchbar filters the decklist by CardBack text', () =>{
    render(
        <DeckDetailView 
            cards={testCards}
            decks={testDecks}
         />
    );
    let searchTerm = 'Woof!';
    let searchBox = screen.getByRole('textbox', {name: 'deckSearch'});
    userEvent.type(searchBox , searchTerm);
    expect(screen.getByRole('cell', {name: testCards[1].cardBack})).toBeTruthy();
    expect(screen.queryByRole('cell', {name: testCards[0].cardBack})).toBeNull();
});

test('Clicking edit on a card will display a flashcard form with the fields already populated', () =>{
    let localTestCard = [
        {
            _id: 2,
            cardFront: "test cardFront",
            cardBack: "test cardBack",
            cardDeck: "Simple questions for simple people",
            dateCreated: Date.now(),
        }
    ]
    render(
        <DeckDetailView 
            cards={localTestCard}
            decks={testDecks}
         />
    );
    userEvent.click(screen.getByRole('button', {name: 'Edit'}));
    expect(screen.getByRole('textbox',{name: 'cardFrontField'})).toHaveValue(localTestCard[0].cardFront);
    expect(screen.getByRole('textbox',{name: 'cardBackField'})).toHaveValue(localTestCard[0].cardBack);
    expect(screen.getByRole('textbox',{name: 'inputSuggestionField'})).toHaveValue(localTestCard[0].cardDeck);
});
