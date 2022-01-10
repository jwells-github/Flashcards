import './Styles/App.css';
import './Styles/Styles.css';
import React, {Component} from 'react'
import EntranceForm from './EntranceForm';
import FlashcardMenu from './FlashcardMenu';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
      .then(state  => {
        this.setState(state)
        this.setState({loading:false})
      });
  }

  setLoginStatus(bool){
    this.setState({loggedIn: bool})
  }

  render() {
    let body = !this.state.loggedIn ? <EntranceForm setLoginStatus={this.setLoginStatus}/> : <FlashcardMenu/>
    if(this.state.loading){
      body = <h1>Loading...</h1>
    }
    
    return (
      <div className="App"> 
        <div className="header">
          <div>
            <i class="fas fa-arrow-left"></i>
            <span>Flashcard App</span></div>
          <div>
            <span>{this.state.loggedIn ? "You are logged in" : ""}</span>
          </div>
        </div>
        {body}
      </div>
    );
  }
}

export default App;
