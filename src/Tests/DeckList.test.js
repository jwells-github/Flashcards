import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
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
    userEvent.type(searchBox , deckWeSearchedFor)
    expect(screen.getByRole('heading', {name: deckWeSearchedFor})).toBeTruthy();
    expect(screen.queryByRole('heading', {name: deckThatShouldNotShowUp})).toBeNull();
})

test('the searchbar will return partial matches', ()=>{
    render(<DeckList decks={testDecks}/>)
    let searchTerm = 'Facts'
    let partialMatchOne = 'Frog Facts'
    let partialMatchTwo = 'Fish Facts'
    let deckThatShouldNotShowUp = 'Iguana Inquerys'
    let searchBox = screen.getByRole('textbox', {name: 'deckSearch'})
    userEvent.type(searchBox , searchTerm)
    expect(screen.getByRole('heading', {name: partialMatchOne})).toBeTruthy();
    expect(screen.getByRole('heading', {name: partialMatchTwo})).toBeTruthy();
    expect(screen.queryByRole('heading', {name: deckThatShouldNotShowUp})).toBeNull();
})

test('clicking add card will display the form overlay', () =>{
    render(<DeckList decks={testDecks}/>)
    expect(screen.queryByRole('button', {name: 'Submit Card'})).toBeNull();
    userEvent.click(screen.getByRole('button', {name: 'Add a flashcard'}));
    expect(screen.getByRole('button', {name: 'Submit Card'})).toBeTruthy();
})

test('the Play All button will be disabled if there are no decks', () =>{
    render(<DeckList decks={[]}/>);
    expect(screen.getByRole('button', {name: 'Play All'})).toBeDisabled();
})

test('the Play All button will not be disabled if there are decks', () =>{
    render(<DeckList decks={testDecks}/>);
    expect(screen.getByRole('button', {name: 'Play All'})).not.toBeDisabled();
})

test('the View All button will be disabled if there are no decks', () =>{
    render(<DeckList decks={[]}/>);
    expect(screen.getByRole('button', {name: 'View All'})).toBeDisabled();
})

test('the View All button will not be disabled if there are decks', () =>{
    render(<DeckList decks={testDecks}/>);
    expect(screen.getByRole('button', {name: 'View All'})).not.toBeDisabled();
})
