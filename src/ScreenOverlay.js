import React, {Component} from 'react'
import InputSuggestion from './InputSuggestion';

class ScreenOverlay extends Component {
        constructor(props){
        super(props);
        this.hideOverlay = this.hideOverlay.bind(this);
    }
    
    hideOverlay(event){
        if(event.target === event.currentTarget){
            this.props.hideOverlay()
        }
    }

    render(){
        let child = this.props.displayOverlay ? "" :this.props.children;
        return(
        <div  className={this.props.displayOverlay ? "flashcardOverlay" : "hide"} onMouseDown={this.hideOverlay}>
            {this.props.children}
        </div>
        )
    }
}

export default ScreenOverlay;