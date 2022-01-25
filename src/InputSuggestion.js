import React, {Component} from 'react'


class InputSuggestion extends Component {
    static maxSuggestions = 5;
    constructor(props){
        super(props);
        this.state = {
            filteredData: [],
            selectedSuggestion: -1, // -1 indicating no suggestion is selected
            displaySuggestions: false,
        };
        this.updateSuggestions = this.updateSuggestions.bind(this);
        this.useSuggestion = this.useSuggestion.bind(this);
        this.handleSuggestionInput = this.handleSuggestionInput.bind(this);
        this.hideSuggestions = this.hideSuggestions.bind(this);
        this.displaySuggestions = this.displaySuggestions.bind(this);
    }

    componentWillUnmount(){
        if(this.hideSuggestionsTimer){
            clearTimeout(this.hideSuggestionsTimer);
        }
    }
    handleSuggestionInput(event){
        if(this.state.filteredData.length <= 0){
            return;
        }
        let downKey = event.key === "Down" || event.key === "ArrowDown"
        let upKey = event.key === "Up" || event.key === "ArrowUp"
        let enterKey = event.key === "Enter";
        if(downKey){
            if(InputSuggestion.maxSuggestions <= this.state.selectedSuggestion ){
                return;
            }
            this.setState(prevState =>({
                selectedSuggestion: prevState.selectedSuggestion +1
            }));
        }
        if(upKey){
            if(this.state.selectedSuggestion <= -1){
                return;
            }
            this.setState(prevState =>({
                selectedSuggestion: prevState.selectedSuggestion -1
            }));
        }
        if(enterKey){
            if(this.state.selectedSuggestion === -1 ){
                return;
            }
            event.preventDefault();
            this.useSuggestion(this.state.filteredData[this.state.selectedSuggestion])
        }
    }

    updateSuggestions(event){
        this.setState({ 
            selectedSuggestion: -1,
            filteredData : this.props.dataArray.filter(data => data.match(new RegExp("^"+event.target.value,"i"))).sort()
         });
         this.props.updateInputValue(event.target.value);
    }

    useSuggestion(suggestion){
        this.setState({
            selectedSuggestion: 0,
            filteredData: []
        })
        this.props.updateInputValue(suggestion)
    }
    hideSuggestions(){
       this.hideSuggestionsTimer = setTimeout(() => {this.setState({displaySuggestions: false})}, 300)
    }
    displaySuggestions(){
        this.setState({displaySuggestions: true})
    }

    render(){
        return(
        <div className="formField inputSuggestionField">
            <label htmlFor={this.props.fieldName}>{this.props.fieldName}:</label>
            <input onFocus={this.displaySuggestions} onBlur={this.hideSuggestions} onKeyDown={this.handleSuggestionInput}
                name={this.props.fieldName} type="text" 
                value={this.props.InputValue} onChange={this.updateSuggestions} 
                autoComplete="off"/>
            <div className={this.state.displaySuggestions? "" : "hide"} data-testid='suggestionsContainer'>
                <div className={this.state.filteredData.length > 0 ? "formSuggestion" : ""}>
                    {this.state.filteredData.slice(0,InputSuggestion.maxSuggestions).map((item, index) => 
                        <span
                            key={index}
                            id={this.state.selectedSuggestion === index  ? "InputSuggestion-Selected" : ""}  
                            value={item} 
                            onClick={() => this.useSuggestion(item)}>
                                {item}
                        </span>)}
                </div>
            </div>
        </div>  
        )
      }
}

export default InputSuggestion;