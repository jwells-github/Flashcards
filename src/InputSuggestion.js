import React, {Component} from 'react'


class InputSuggestion extends Component {
    constructor(props){
        super(props);
        this.state = {
            filteredData: [],
            selectedSuggestion: 0,
        };
        this.updateSuggestions = this.updateSuggestions.bind(this);
        this.useSuggestion = this.useSuggestion.bind(this);
    }

    updateSuggestions(event){
        this.setState({ 
            selectedSuggestion: 0,
            filteredData : this.props.dataArray.filter(data => data.match(new RegExp(event.target.value,"i")))
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

      render(){
          return(
            <div className="formField">
                <label htmlFor={this.props.fieldName}>{this.props.fieldName}:</label>
                <input name={this.props.fieldName} type="text" value={this.props.InputValue} onChange={this.updateSuggestions} autoComplete="off"/>
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