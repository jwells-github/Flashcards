import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import EntranceForm from '../EntranceForm';

test('login form is displayed by default', () =>{
    render(<EntranceForm/>)
    expect(screen.getByRole('button', {name: 'Log in'})).toBeTruthy();
    expect(screen.getByRole('heading', {name: 'Log in'})).not.toHaveClass('faded')
    expect(screen.queryByRole('button', {name: 'Sign up'})).toBeNull();
    expect(screen.getByRole('heading', {name: 'Sign up'})).toHaveClass('faded')
})  

test('clicking Sign up should display the sign up form', () =>{
    render (<EntranceForm/>)
    userEvent.click(screen.getByRole('heading', {name: 'Sign up'}));
    expect(screen.getByRole('button', {name: 'Sign up'})).toBeTruthy();
    expect(screen.getByRole('heading', {name: 'Sign up'})).not.toHaveClass('faded')
    expect(screen.getByRole('heading', {name: 'Log in'})).toHaveClass('faded')
    expect(screen.queryByRole('button', {name: 'Log in'})).toBeNull();
})