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