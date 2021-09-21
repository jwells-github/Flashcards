import React, {Component} from 'react'

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
        fetch("/signup",{
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          withCredentials: true,
          credentials: 'include',
          headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({username: this.state.signUpUsername, password: this.state.signUpPassword}) 
        }).then(response => response.json()).then(response => this.props.handleResponse(response));
      }

      render(){
          return(
            <div className="signUpForm">
              <form onSubmit={this.signUp}>
                <div className="signUpField">
                  <label htmlFor="signUpUsername">Username:</label>
                  <input name="signUpUsername"type="text" onChange={this.handleChange}/>
                </div>
                <div className="signUpField">
                  <label htmlFor="signUpFieldPassword">Password:</label>
                  <input name="signUpFieldPassword" type="password" onChange={this.handleChange}/>
                </div>
                <button type="submit">Signup</button>
              </form>
            </div>
          )
      }
}

export default SignUpForm;