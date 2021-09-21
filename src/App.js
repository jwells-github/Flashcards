import './App.css';
import React, {Component} from 'react'
import EntranceForm from './EntranceForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.setLoginStatus = this.setLoginStatus.bind(this)
  }

  componentDidMount(){
    fetch('/user',{
      withCredentials: true,
      credentials: 'include'
    })
      .then(response => response.json())
      .then(state => this.setState(state));
  }

  setLoginStatus(bool){
    this.setState({loggedIn: bool})
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.loggedIn ? "You are logged in" : ""}</h1>
        <EntranceForm setLoginStatus={this.setLoginStatus}/>
      </div>
    );
  }
}

export default App;
