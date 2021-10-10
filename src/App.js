import './App.css';
import Login from './Login/login';
import Directory from './PhoneDirectory/directory';
import axios from 'axios';
import React from "react";

const baseUrl = 'https://phone-directory-service.herokuapp.com';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthorized: false,
      token: ''
    }
  }
  onLogin = (username, password) => {
    axios.post(`${baseUrl}/user/login`, { username, password }).then(res => {
      this.setState({ isAuthorized: true, token: res.data.token })
    }).catch(err => alert('Username/Password Not Correct!!!'))
  }

  onSignUp = (username, password) => {
    axios.post(`${baseUrl}/user/sign-up`, { username, password }).then(res => {
      this.setState({ isAuthorized: true, token: res.data.token })
    }).catch(err => alert('Username already Taken'))
  }

  onLogout = () => {
    axios.post(`${baseUrl}/user/logout`, {}, {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    }).then(res => {
      this.setState({ isAuthorized: false, token: '' })
    })
  }

  render() {
    return (
      <div className="App" >
        {!this.state.isAuthorized && <Login onLogin={this.onLogin} onSignUp={this.onSignUp} />}
        { this.state.isAuthorized && <Directory token={this.state.token} onLogout={this.onLogout} />}
      </div >
    );
  }
}

export default App;
