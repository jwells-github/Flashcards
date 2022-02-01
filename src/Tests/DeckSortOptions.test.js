import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeckSortOptions from '../DeckSortOptions';

const testDecks = [
    {deckName: 'Frog Facts', count: 99},
    {deckName: 'Fish Facts', count: 1},
    {deckName: 'Quail Questions', count: 10},
    {deckName: 'Iguana Inquerys', count: 2}, 
 ];

 
test('selecting Reverse alphabetical should return the decks sorted in reverse alphabetical order', () =>{
    let sorteddecks = JSON.parse(JSON.stringify(testDecks));
    let expectedResult =[
        {deckName: 'Quail Questions', count: 10},
        {deckName: 'Iguana Inquerys', count: 2}, 
        {deckName: 'Frog Facts', count: 99},
        {deckName: 'Fish Facts', count: 1},
    ];
    render(<DeckSortOptions 
                decks={sorteddecks} 
                returnDecks={(decks) => sorteddecks = decks}
            />
    );
    userEvent.selectOptions(screen.getByRole('combobox'), ['Reverse alphabetical']);
    expect(JSON.stringify(sorteddecks)).toEqual(JSON.stringify(expectedResult));
});

test('selecting Alphabetical should return the decks sorted in alphabetical order', () =>{
    let sorteddecks = JSON.parse(JSON.stringify(testDecks));
    let expectedResult =[
        {deckName: 'Fish Facts', count: 1},
        {deckName: 'Frog Facts', count: 99},
        {deckName: 'Iguana Inquerys', count: 2}, 
        {deckName: 'Quail Questions', count: 10},
    ];
    render(<DeckSortOptions 
                decks={sorteddecks} 
                returnDecks={(decks) => sorteddecks = decks}
            />
    );
    userEvent.selectOptions(screen.getByRole('combobox'), ['Alphabetical']);
    expect(JSON.stringify(sorteddecks)).toEqual(JSON.stringify(expectedResult));
});

test('selecting Number of cards (ascending) should return the decks sorted by the number of cards', () =>{
    let sorteddecks = JSON.parse(JSON.stringify(testDecks));
    let expectedResult =[
        {deckName: 'Fish Facts', count: 1},
        {deckName: 'Iguana Inquerys', count: 2}, 
        {deckName: 'Quail Questions', count: 10},
        {deckName: 'Frog Facts', count: 99},
    ];
    render(<DeckSortOptions 
                decks={sorteddecks} 
                returnDecks={(decks) => sorteddecks = decks}
            />
    );
    userEvent.selectOptions(screen.getByRole('combobox'), ['Number of cards (ascending)']);
    expect(JSON.stringify(sorteddecks)).toEqual(JSON.stringify(expectedResult));
});

test('selecting Number of cards (descending) should return the decks sorted by the number of cards in reverse', () =>{
    let sorteddecks = JSON.parse(JSON.stringify(testDecks));
    let expectedResult =[
        {deckName: 'Frog Facts', count: 99},
        {deckName: 'Quail Questions', count: 10},
        {deckName: 'Iguana Inquerys', count: 2}, 
        {deckName: 'Fish Facts', count: 1},
    ];
    render(<DeckSortOptions 
                decks={sorteddecks} 
                returnDecks={(decks) => sorteddecks = decks}
            />
    );
    userEvent.selectOptions(screen.getByRole('combobox'), ['Number of cards (descending)']);
    expect(JSON.stringify(sorteddecks)).toEqual(JSON.stringify(expectedResult));
});