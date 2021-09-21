import React, {Component} from 'react'

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
        fetch("/login",{
          method: 'POST',
          withCredentials: true,
          credentials: 'include',
          headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
          },
          body: JSON.stringify({username: this.state.loginUsername, password: this.state.loginPassword}) 
        }).then(response => response.json()).then(response => this.props.handleResponse(response));
      }

      render(){
          return(
            <div className="loginForm">
              <form onSubmit={this.login}>
                <div className="loginField">
                  <label htmlFor="loginUsername">Username:</label>
                  <input name="loginUsername"type="text" onChange={this.handleChange}/>
                </div>
                <div className="loginField">
                  <label htmlFor="loginPassword">Password:</label>
                  <input name="loginPassword" type="password" onChange={this.handleChange}/>
                </div>
                <button type="submit">Login</button>
              </form>
            </div>
          )
      }
}

export default LoginForm;