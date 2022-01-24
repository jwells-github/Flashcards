import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Flashcard from '../Flashcard';

const cardProp = {
    cardFront: 'front',
    cardBack: 'back',
    cardDeck: 'deck'
}

test('flashcard starts unflipped', () =>{
    render(<Flashcard card={cardProp}/>)
    expect(screen.getByTestId('flashcardInner')).not.toHaveClass('flashcardInnerFlip')
})

test('clicking the flashcard will flip it', () =>{
    render(<Flashcard card={cardProp}/>)
    userEvent.click(screen.getByTestId('flashcardInner'));
    expect(screen.getByTestId('flashcardInner')).toHaveClass('flashcardInnerFlip')
})

test('clicking a flipped flashcard will flip it back', ()=>{
    render(<Flashcard card={cardProp}/>)
    userEvent.click(screen.getByTestId('flashcardInner'));
    userEvent.click(screen.getByTestId('flashcardInner'));
    expect(screen.getByTestId('flashcardInner')).not.toHaveClass('flashcardInnerFlip')
})

test('the action buttons are inactive at the start', () =>{
    render(<Flashcard card={cardProp}/>)
    expect(screen.getByTestId('buttonIncorrectDiv')).toHaveClass('buttonInactive')
    expect(screen.getByTestId('buttonCorrectDiv')).toHaveClass('buttonInactive')
})

test('the action buttons become active once the card is flipped', () =>{
    render(<Flashcard card={cardProp}/>)
    userEvent.click(screen.getByTestId('flashcardInner'));
    expect(screen.getByTestId('buttonIncorrectDiv')).not.toHaveClass('buttonInactive')
    expect(screen.getByTestId('buttonCorrectDiv')).not.toHaveClass('buttonInactive')
})

test('the action buttons become inactive again once Incorrect is pressed', () =>{
    render(<Flashcard card={cardProp} handleCardResult={()=>{}}/>)
    userEvent.click(screen.getByTestId('flashcardInner'));
    userEvent.click(screen.getByRole('button', {name: 'Incorrect'}));
    expect(screen.getByTestId('buttonIncorrectDiv')).toHaveClass('buttonInactive')
    expect(screen.getByTestId('buttonCorrectDiv')).toHaveClass('buttonInactive')
})

test('the action buttons become inactive again once Correct is pressed', () =>{
    render(<Flashcard card={cardProp} handleCardResult={()=>{}}/>)
    userEvent.click(screen.getByTestId('flashcardInner'));
    userEvent.click(screen.getByRole('button', {name: 'Correct'}));
    expect(screen.getByTestId('buttonIncorrectDiv')).toHaveClass('buttonInactive')
    expect(screen.getByTestId('buttonCorrectDiv')).toHaveClass('buttonInactive')
})

test('the card front is shown once Incorrect is pressed', () =>{
    render(<Flashcard card={cardProp} handleCardResult={()=>{}}/>)
    userEvent.click(screen.getByTestId('flashcardInner'));
    userEvent.click(screen.getByRole('button', {name: 'Incorrect'}));
    expect(screen.getByTestId('flashcardInner')).not.toHaveClass('flashcardInnerFlip')
})

test('the card front is shown once Correct is pressed', () =>{
    render(<Flashcard card={cardProp} handleCardResult={()=>{}}/>)
    userEvent.click(screen.getByTestId('flashcardInner'));
    userEvent.click(screen.getByRole('button', {name: 'Correct'}));
    expect(screen.getByTestId('flashcardInner')).not.toHaveClass('flashcardInnerFlip')
})