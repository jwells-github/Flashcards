import { render, screen, fireEvent } from '@testing-library/react';
import DeckList from '../DeckList';

const testDecks=[
   {deckName: 'Frog Facts', count: 99},
   {deckName: 'Fish Facts', count: 1},
   {deckName: 'Quail Questions', count: 10},
   {deckName: 'Iguana Inquerys', count: 2}, 
]

test('decklist renders given decks', () =>{
    render(<DeckList decks={testDecks}/>)
    testDecks.forEach(deck =>{
        expect(screen.getByRole('heading', {name: deck.deckName})).toBeTruthy();
    })
})

test('typing in the searchbar filters the decklist', () =>{
    render(<DeckList decks={testDecks}/>)
    let deckWeSearchedFor = 'Frog Facts'
    let deckThatShouldNotShowUp = 'Fish Facts'
    let searchBox = screen.getByRole('textbox', {name: 'deckSearch'})
    fireEvent.change(searchBox, {target: {value : deckWeSearchedFor}})
    expect(screen.getByRole('heading', {name: deckWeSearchedFor})).toBeTruthy();
    expect(screen.queryByRole('heading', {name: deckThatShouldNotShowUp})).toBeNull();
})

test('the searchbar will return partial matches', ()=>{
    render(<DeckList decks={testDecks}/>)
    let searchTerm = 'Facts'
    let partialMatchOne = 'Frog Facts'
    let partialMatchTwo = 'Fish Facts'
    let searchBox = screen.getByRole('textbox', {name: 'deckSearch'})
    fireEvent.change(searchBox, {target: {value : searchTerm}})
    expect(screen.getByRole('heading', {name: partialMatchOne})).toBeTruthy();
    expect(screen.getByRole('heading', {name: partialMatchTwo})).toBeTruthy();
})

test('clicking add card will display the form overlay', () =>{
    render(<DeckList decks={testDecks}/>)
    fireEvent.click(screen.getByRole('button', {name: 'Add a flashcard'}));
    expect(screen.getByRole('button', {name: 'Submit Card'})).toBeTruthy();
})