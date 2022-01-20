import React, {Component} from 'react'
import { requestLogin } from './serverFetches';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginUsername: '',
            loginPassword: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }

    login(event){
        event.preventDefault();
        if(this.state.loginUsername === '' || this.state.loginPassword === '') return;
        requestLogin(this.state.loginUsername, this.state.loginPassword)
          .then(response => this.props.handleResponse(response));
      }

      render(){
          return(
            <div className="loginForm">
              <form onSubmit={this.login}>
                <div className="formField">
                  <label htmlFor="loginUsername">Username:</label>
                  <input name="loginUsername"type="text" autoFocus  onChange={this.handleChange}/>
                </div>
                <div className="formField">
                  <label htmlFor="loginPassword">Password:</label>
                  <input name="loginPassword" type="password" onChange={this.handleChange}/>
                </div>
                <button type="submit">Log in</button>
              </form>
            </div>
          )
      }
}

export default LoginForm;