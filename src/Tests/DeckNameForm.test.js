import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeckNameForm from '../DeckNameForm';

const testDecks=[
    'Fish Facts',
    'Frog Facts',
    'Phrase that contains, but does not start with F',
    'Quail Questions',
    'Iguana Inquerys',
]


test('Submitting the current deckname in the form will display a warning', ()=>{
    let testCardDeck = 'test'
    render(<
        DeckNameForm
            decks={testDecks}
            cardDeck={testCardDeck}
            inGuestMode={true}
            editDeckName={()=>{}}
            hideOverlay={()=>{}}
        />
    );
    expect(screen.queryByRole('heading',{name: 'Warning:'})).not.toBeTruthy()
    userEvent.click(screen.getByRole('button', {name:'Submit Card'}))
    expect(screen.getByRole('heading',{name: 'Warning:'})).toBeTruthy()
}); 

test('submitting a deckname that is already being used will display a warning', ()=>{
    let testCardDeck = 'test'
    render(<
        DeckNameForm
            decks={testDecks}
            cardDeck={testCardDeck}
            inGuestMode={true}
            editDeckName={()=>{}}
            hideOverlay={()=>{}}
        />
    );
    expect(screen.queryByRole('heading',{name: 'Warning:'})).not.toBeTruthy()
    userEvent.clear(screen.getByRole('textbox'));
    userEvent.type(screen.getByRole('textbox'), testDecks[0]);
    userEvent.click(screen.getByRole('button', {name:'Submit Card'}))
    expect(screen.getByRole('heading',{name: 'Warning:'})).toBeTruthy()
}); 

test('a message should be displayed when a failing response is received', done =>{
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({success: false})
        })
    );
    let testCardDeck = 'test'
    render(<
        DeckNameForm
            decks={testDecks}
            inGuestMode={false}
            cardDeck={testCardDeck}
            editDeckName={()=>{}}
            hideOverlay={()=>{}}
        />
    );
    expect(screen.queryByRole('heading',{name: 'Warning:'})).not.toBeTruthy()
    userEvent.clear(screen.getByRole('textbox'));
    userEvent.type(screen.getByRole('textbox'), 'a new deckname');
    userEvent.click(screen.getByRole('button', {name:'Submit Card'}))
    setTimeout(() => {
        expect(screen.getByRole('heading',{name: 'Warning:'})).toBeTruthy(), 
        done();
    }, 200)

})