import './Styles/App.css';
import './Styles/Styles.css';
import React, {Component} from 'react'
import EntranceForm from './EntranceForm';
import FlashcardMenu from './FlashcardMenu';
import { requestLogout, requestUser } from './serverFetches';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loggedIn: false,
      guestMode: false,
      displayBackButton: false,
    };
    this.setLoginStatus = this.setLoginStatus.bind(this);
    this.setGuestStatus = this.setGuestStatus.bind(this);
    this.showBackButton = this.showBackButton.bind(this);
    this.hideBackButton = this.hideBackButton.bind(this);
    this.logout = this.logout.bind(this);
    this.getBody = this.getBody.bind(this);
  }

  componentDidMount(){
    requestUser().then(state  => {
        this.setState(state)
        this.setState({loading:false})
      });
  }

  setLoginStatus(bool){
    this.setState({loggedIn: bool})
  }
  setGuestStatus(bool){
    this.setState({guestMode: bool})
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
  logout(){
    requestLogout();
    this.setState({
      loggedIn: false,
      guestMode: false,
      displayBackButton: false,
    })
  }
  getBody(){
    if(this.state.loggedIn || this.state.guestMode){
      return  <FlashcardMenu 
                hideBackButton={this.hideBackButton} 
                showBackButton={this.showBackButton}
                inGuestMode={this.state.guestMode}
              />
    }
    else{
      return <EntranceForm 
                setLoginStatus={this.setLoginStatus}
                setGuestStatus={this.setGuestStatus}
              />; 
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
              {this.state.loggedIn || this.state.guestMode ? <button className='logoutButton' onClick={this.logout}>Log out</button> : ''}
          </div>
        </div>
        {this.getBody()}
      </div>
    );
  }
}

export default App;
