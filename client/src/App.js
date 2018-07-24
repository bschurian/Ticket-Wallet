import React, { Component } from 'react';
import './App.css';
import TicketList from './components/ticket-list';

class App extends Component {
  // // Check for browser support of service worker
  // constructor(props) {
  //   super(props);
  //   if ("serviceWorker" in navigator) {

  //     navigator.serviceWorker.register('service-worker.js')
  //       .then(function (registration) {
  //         // Successful registration
  //         console.log('Hooray. Registration successful, scope is:', registration.scope);
  //       }).catch(function (err) {
  //         // Failed registration, service worker won’t be installed
  //         console.log('Whoops. Service worker registration failed, error:', err);
  //       });

  //   }
  // }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Ticket-Wallet</h1>
        </header>
        <div className="App">
          <TicketList />
        </div>
      </div>
    );
  }
}

export default App;
