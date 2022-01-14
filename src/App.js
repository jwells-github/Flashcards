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
      displayBackButton: false,
    };
    this.setLoginStatus = this.setLoginStatus.bind(this)
    this.showBackButton = this.showBackButton.bind(this);
    this.hideBackButton = this.hideBackButton.bind(this);
    this.getBody = this.getBody.bind(this);
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
  showBackButton(){
    this.setState({displayBackButton: true})
  }
  hideBackButton(){
    this.setState({displayBackButton: false})
  }
  historyBack(){
    window.history.back()
  }
  getBody(){
    if(this.state.loggedIn){
      return  <FlashcardMenu hideBackButton ={this.hideBackButton} showBackButton = {this.showBackButton}/>
    }
    else{
      return <EntranceForm setLoginStatus={this.setLoginStatus}/>; 
    }
  }
  render() {
    return (
      <div className="App"> 
        <div className="header">
          <div>
            <i onClick={this.historyBack} className={this.state.displayBackButton ? "fas fa-arrow-left" : "fas fa-arrow-left invisibile"}></i>
            <span>Flashcard App</span></div>
          <div>
            <span>{this.state.loggedIn ? "You are logged in" : ""}</span>
          </div>
        </div>
        {this.getBody()}
      </div>
    );
  }
}

export default App;
