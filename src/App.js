import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import SignIn from './components/SignIn'
import Profile from './components/Profile'
import ChatPage from './components/ChatPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/" component={Profile} />
        <Route exact path="/chat/:theirUID" component={Profile} />
        <Route exact path="/chat/:theirUID" component={ChatPage} />
      </Router>
    </div>
  );
}

export default App;
