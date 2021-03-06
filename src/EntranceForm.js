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

    getForm(){
      if(this.state.showLoginForm){
        return(
        <LoginForm handleResponse={this.handleResponse}/>
        )
      }
      else{
        return(
          <SignUpForm handleResponse={this.handleResponse}/>
        )
      }
    }

    render(){
        return(
          <div>
            <div className="entranceForm">
              <div className="selectionButtons">
                  <h2
                    className={this.state.showLoginForm ? "" : "faded"}
                    onClick={() => this.displayLoginForm(true)}>Log in</h2>
                  <h2 
                  className={this.state.showLoginForm ? "faded" : ""}
                  onClick={() => this.displayLoginForm(false)}>Sign up</h2>
              </div>
              {this.getForm()}
              <p>{this.state.formError}</p>
            </div>
            <div className='guestForm'>
              <button onClick={() => this.props.setGuestStatus(true)}>Demo the App in guest mode</button>
              <span>All data will be lost when session ends</span>
            </div>
          </div>

        )
    }
}

export default EntranceForm;