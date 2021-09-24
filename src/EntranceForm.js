import React, {Component} from 'react'
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

class EntranceForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLoginForm: true,
            formError: '',
        };
        this.handleResponse = this.handleResponse.bind(this);
    }

    displayLoginForm(bool){
      if(bool !== this.state.showLoginForm){
        this.setState({showLoginForm: bool, formError: ''});
      }
    }

    handleResponse(response){
        if(response.formError){
            this.setState({formError: response.formError});
        }
        else{
          this.setState({formError : ''})
        }
        if(response.loggedIn){
            this.props.setLoginStatus(response.loggedIn);
        }   
    }

      render(){
          let form = this.state.showLoginForm ? <LoginForm handleResponse={this.handleResponse}/> : <SignUpForm handleResponse={this.handleResponse}/>
          return(
            <div className="entranceForm">
            <div className="selectionButtons">
                <h2
                 className={this.state.showLoginForm ? "" : "faded"}
                 onClick={() => this.displayLoginForm(true)}>Log in</h2>
                <h2 
                className={this.state.showLoginForm ? "faded" : ""}
                onClick={() => this.displayLoginForm(false)}>Sign Up</h2>
            </div>
            {form}
            <p>{this.state.formError}</p>
          </div>
          )
      }
}

export default EntranceForm;