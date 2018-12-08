import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import SignUpPage from './frontend/sign-in/signupPage';
import LoginPage from './frontend/Login/loginPage';
import DisplayPage from './frontend/displayPage/displayPage';

class App extends Component {
  render() {
    return (
      <Switch>
        <div className="App">
          <Route path="/" exact component={LoginPage}/>
          <Route path="/signup" component={SignUpPage}/>
          <Route path="/displayPage" component={DisplayPage}/>
          <Route path="/login" component={LoginPage}/>
        </div>
      </Switch>
    );
  }
}

export default App;
