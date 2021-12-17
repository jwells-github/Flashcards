import React, {Component} from 'react'
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
        return(
        <div  className={this.props.displayOverlay ? "flashcardOverlay" : "hide"} onMouseDown={this.hideOverlay}>
            {this.props.children}
        </div>
        )
    }
}

export default ScreenOverlay;