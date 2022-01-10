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
  render() {
    let body = <EntranceForm setLoginStatus={this.setLoginStatus}/>; 
    if(this.state.loggedIn){
      body =  <FlashcardMenu
                 hideBackButton ={this.hideBackButton}
                 showBackButton = {this.showBackButton}
              />
    }
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
        {body}
      </div>
    );
  }
}

export default App;
