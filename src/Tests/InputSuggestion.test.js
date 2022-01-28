import React from 'react'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputSuggestion from '../InputSuggestion';

const testDataArray=[
    'Fish Facts',
    'Frog Facts',
    'Phrase that contains, but does not start with F',
    'Quail Questions',
    'Iguana Inquerys',
]

test('InputSuggestion will display sequential matches to user input from props.dataArray', () =>{
    let testInputValue = "";
    render(
        <InputSuggestion 
            inputValue={testInputValue}
            updateInputValue={(value) => testInputValue=value}
            dataArray={testDataArray}
        />
    );
    userEvent.type(screen.getByRole('textbox'), 'F');
    expect(screen.getByText('Fish Facts')).toBeTruthy();
    expect(screen.getByText('Frog Facts')).toBeTruthy();
    expect(screen.queryByText('Phrase that contains, but does not start with F')).not.toBeTruthy();
})

test('InputSuggestion will not display more than the maximum number of suggestions', () =>{
    let testInputValue = "";
    let maxSuggestions = InputSuggestion.maxSuggestions;
    let suggestionText = "testSuggestion"
    let maxDataArray=[]
    for(let i = 0; i <= maxSuggestions; i++){
        maxDataArray.push(suggestionText);
    }
    render(
        <InputSuggestion 
            inputValue={testInputValue}
            updateInputValue={(value) => testInputValue=value}
            dataArray={maxDataArray}
        />
    );
    userEvent.type(screen.getByRole('textbox'), suggestionText);
    expect(screen.getAllByText(suggestionText).length).toEqual(maxSuggestions);
    expect(maxDataArray.length).toBeGreaterThan(maxSuggestions);

});

test('the suggestions field is hidden by default', () =>{
    let testInputValue = "";
    render(
        <InputSuggestion 
            inputValue={testInputValue}
            updateInputValue={(value) => testInputValue=value}
            dataArray={testDataArray}
        />
    );
    expect(screen.getByTestId('suggestionsContainer')).toHaveClass('hide');
});


test('the suggestions field is hidden by default', () =>{
    let testInputValue = "";
    render(
        <InputSuggestion 
            inputValue={testInputValue}
            updateInputValue={(value) => testInputValue=value}
            dataArray={testDataArray}
        />
    );
    expect(screen.getByTestId('suggestionsContainer')).toHaveClass('hide');
});


test('the suggestions field is displayed when the textbox is focused', () =>{
    let testInputValue = "";
    render(
        <InputSuggestion 
            inputValue={testInputValue}
            updateInputValue={(value) => testInputValue=value}
            dataArray={testDataArray}
        />
    );
    userEvent.click(screen.getByRole('textbox'));
    expect(screen.getByTestId('suggestionsContainer')).not.toHaveClass('hide');
});

test('the suggestions field is hidden when the textbox is blurred', () =>{
    let testInputValue = "";
    render(
        <InputSuggestion 
            inputValue={testInputValue}
            updateInputValue={(value) => testInputValue=value}
            dataArray={testDataArray}
        />
    );
    userEvent.click(screen.getByRole('textbox'));
    userEvent.click(screen.getByTestId('suggestionsContainer'));
    setTimeout(() => expect(screen.getByTestId('suggestionsContainer')).toHaveClass('hide'), InputSuggestion.suggestionDisplayTimeout)
});

test('pressing the down arrow in the suggestion field will highlight the suggestion below',() =>{
    let testInputValue = "";
    render(
        <InputSuggestion 
            inputValue={testInputValue}
            updateInputValue={(value) => testInputValue=value}
            dataArray={testDataArray}
        />
    );
    userEvent.type(screen.getByRole('textbox'), 'F');
    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(screen.getByText('Fish Facts').id).toEqual('InputSuggestion-Selected');
    expect(screen.getByText('Frog Facts').id).not.toEqual('InputSuggestion-Selected');
    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(screen.getByText('Frog Facts').id).toEqual('InputSuggestion-Selected');
    expect(screen.getByText('Fish Facts').id).not.toEqual('InputSuggestion-Selected');
});

test('pressing the up arrow in the suggestion field will highlight the suggestion above',() =>{
    let testInputValue = "";
    render(
        <InputSuggestion 
            inputValue={testInputValue}
            updateInputValue={(value) => testInputValue=value}
            dataArray={testDataArray}
        />
    );
    userEvent.type(screen.getByRole('textbox'), 'F');
    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    userEvent.type(screen.getByRole('textbox'), '{arrowup}'); 
    expect(screen.getByText('Fish Facts').id).toEqual('InputSuggestion-Selected');
    expect(screen.getByText('Frog Facts').id).not.toEqual('InputSuggestion-Selected');
});

test('pressing enter on a selected suggestion will place its value in the form field',() =>{
    let testInputValue = "";
    const {rerender} = render(
            <InputSuggestion 
                InputValue={testInputValue}
                updateInputValue={(value) => testInputValue=value}
                dataArray={testDataArray}
            />
        );
    userEvent.type(screen.getByRole('textbox'), 'F');
    userEvent.keyboard('{arrowdown}')
    userEvent.keyboard('[Enter]')
    rerender(
        <InputSuggestion 
            InputValue={testInputValue}
            updateInputValue={(value) => testInputValue=value}
            dataArray={testDataArray}
        />
    )
    expect((screen.getByRole('textbox').value)).toEqual('Fish Facts');    
});

test('clicking on a suggestions will place its value in the form field', () =>{
    let testInputValue = "";
    const {rerender} = render(
            <InputSuggestion 
                InputValue={testInputValue}
                updateInputValue={(value) => testInputValue=value}
                dataArray={testDataArray}
            />
        );
    userEvent.type(screen.getByRole('textbox'), 'F');
    userEvent.click(screen.getByText('Frog Facts'))
    rerender(
        <InputSuggestion 
            InputValue={testInputValue}
            updateInputValue={(value) => testInputValue=value}
            dataArray={testDataArray}
        />
    )
    expect((screen.getByRole('textbox').value)).toEqual('Frog Facts');    
})