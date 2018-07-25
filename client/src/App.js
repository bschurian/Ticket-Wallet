import React, { Component } from 'react';
import './App.css';
import TicketList from './components/TicketList';
import PropTypes from 'prop-types';
// import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Route, IndexRoute } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';


class App extends Component {
  // Check for browser support of service worker
  constructor(props) {
    super(props);
    let deferredPrompt;
    const tickets = [{
      name: "fasdf",
      title: "asdfasdf",
      content: "asdfasdfasdf",
      slug: "123456575",
      cuid: "123412341234",
    }]
    this.state = { store: props.store, tickets };
  }
  render() {
    return (
      // <Provider store={this.state.store}>
      <Router history={createBrowserHistory()} >
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">{this.state.title}</h1>
          </header>
          <main>
            <Route exact={true} path="/" render={() =>
              <TicketList tickets={this.state.tickets
              } handleDeleteTicket={(ticketId) => console.log("delete " + ticketId)} />
            }>
            </Route>
            <Route exact={true} path="/:ticketId" render={() =>
              <TicketList tickets={[{
                name: "fasdf",
                title: "asdfasdf",
                content: "asdfasdfasdf",
                slug: "123456575",
                cuid: "123412341234",
              }]
              } handleDeleteTicket={(ticketId) => console.log("delete " + ticketId)} />
            }>
            </Route>
          </main>
        </div >
      </Router >
      // </Provider>
    );
  }
}

export default App;
