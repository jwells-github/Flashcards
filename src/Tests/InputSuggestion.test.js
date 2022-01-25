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
test('the suggestions field is HIDDEN when the textbox is blurred', () =>{
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