import React, {Component} from 'react'
import { requestSignup } from './serverFetches';

class SignUpForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            signUpUsername: '',
            signUpPassword: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }

    signUp(event){
        event.preventDefault();
        if(this.state.signUpUsername === '' || this.state.signUpPassword === '') return;
        requestSignup(this.state.signUpUsername,this.state.signUpPassword)
          .then(response => this.props.handleResponse(response));
      }

      render(){
          return(
            <div className="signUpForm">
              <form onSubmit={this.signUp}>
                <div className="formField">
                  <label htmlFor="signUpUsername">Username:</label>
                  <input name="signUpUsername"type="text" autoFocus onChange={this.handleChange}/>
                </div>
                <div className="formField">
                  <label htmlFor="signUpPassword">Password:</label>
                  <input name="signUpPassword" type="password" onChange={this.handleChange}/>
                </div>
                <button type="submit">Sign up</button>
              </form>
            </div>
          )
      }
}

export default SignUpForm;