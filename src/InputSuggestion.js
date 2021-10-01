import React, {Component} from 'react'


class InputSuggestion extends Component {
    constructor(props){
        super(props);
        this.state = {
            filteredData: [],
            InputValue: '',
            selectedSuggestion: 0,
        };
        this.updateSuggestions = this.updateSuggestions.bind(this);
        this.useSuggestion = this.useSuggestion.bind(this);
        this.handleSuggestionInput = this.handleSuggestionInput.bind(this);
    }

    handleSuggestionInput(event){
        event.preventDefault();
        let downKey = event.key === "Down" || event.key === "ArrowDown"
        let upKey = event.key === "Up" || event.key === "ArrowUp"
        let enterKey = event.key === "Enter";
        if(downKey){
            if(this.state.filteredData.length <= this.state.selectedSuggestion){
                return;
            }
            this.setState(prevState =>({
                selectedSuggestion: prevState.selectedSuggestion +1
            }));
        }
        if(upKey){
            if(this.state.selectedSuggestion <= 0){
                return;
            }
            this.setState(prevState =>({
                selectedSuggestion: prevState.selectedSuggestion -1
            }));
        }
        if(enterKey){
            if(this.state.selectedSuggestion === 0 ){
                return;
            }
            this.useSuggestion(this.state.filteredData[this.state.selectedSuggestion -1] )
        }
    }

    updateSuggestions(event){
        this.setState({ 
            InputValue: event.target.value,
            selectedSuggestion: 0,
            filteredData : this.props.dataArray.filter(data => data.match(new RegExp(event.target.value,"i")))
         });
    }

    useSuggestion(suggestion){
        this.setState({
            InputValue:suggestion,
            selectedSuggestion: 0,
            filteredData: []
        })
        this.props.returnValue(suggestion)
    }

      render(){
          return(
            <div className="formField">
                <label htmlFor={this.props.fieldName}>{this.props.fieldName}:</label>
                <input onKeyUp={this.handleSuggestionInput} name={this.props.fieldName} type="text" value={this.state.InputValue} onChange={this.updateSuggestions} autoComplete="off"/>
                <div className="formSuggestion">
                    {this.state.filteredData.map((item, index) => 
                        <span
                            key={index}
                            id={this.state.selectedSuggestion === index + 1 ? "InputSuggestion-Selected" : ""}  
                            value={item} 
                            onClick={() => this.useSuggestion(item)}>{item}
                        </span>)}
                </div>
            </div>  
          )
      }
}

export default InputSuggestion;