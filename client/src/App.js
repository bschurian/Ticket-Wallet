import React, { Component } from 'react';
import './App.css';
import TicketList from './components/TicketList';
import TicketListItem from './components/TicketListItem/TicketListItem';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Collapsible } from 'react-collapsible';
import GoogleLogin from 'react-google-login';
import User from './components/user.js';
import { Router } from 'react-router';
import { Route, IndexRoute } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';


const tickets = function (state = { tickets: [] }, action) {
    switch (action.type) {
        case 'ADD_TICKET':
            return state.tickets.concat([action.text]);
        default:
            return state
    }
}

const store = createStore(tickets, ['Use Redux']);

class App extends Component {
    /**
     * constructor call, defines state
     */
    constructor(probs) {
        super(probs);
        const tickets = [{
            title: "asdfasdf",
            content: "#dffgwg",
            cuid: "123412341234",
        }, {
            title: "asdfasdf",
            content: "342442",
            cuid: "1234143334342341234",
        }, {
            title: "asdfasdf",
            content: "asdfasdfa",
            cuid: "1234123412341234123",
        }];
        this.state = {
            isAuthenticated: false,
            name: '',
            email: '',
            tickets,
            store
        };
    }
    /**
     *  signup function, reads the data from the googleresponse and fills the sessionStorage and current State with the userData
     */
    signup = (response) => {
        let postData = { googleid: response.w3.Eea, name: response.w3.ig, email: response.w3.U3, token: response.Zi.access_token };

        sessionStorage.setItem('userData', JSON.stringify(postData));
        this.setState({ isAuthenticated: true, name: postData.name, email: postData.email });
    };
    /**
     *  called on signout, clears the session and resets the state
     */
    signout = () => {
        this.setState({ isAuthenticated: false, name: '', email: '' });
        sessionStorage.clear();
    };
    /**
     * alerts the error if the googleResponse got an error
     */
    onFailure = (error) => {
        console.error(error);
    };
    render() {
        let auth = <div className="auth">{
            this.state.isAuthenticated ?
                (
                    <div>
                        <br />
                        <User />
                        <button onClick={this.signout} className="logoutButton" >
                            Logout
                </button>
                    </div>
                ) : (
                    <div>
                        <br />
                        <GoogleLogin
                            clientId="608216264695-93sejhvjsk8dloetsbdiod8gqjmpgutd.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.signup}
                            onFailure={this.onFailure}
                        />
                    </div>
                )
        }</div>;
        return (
            <Provider store={this.state.store}>
                <Router history={createBrowserHistory()} >
                    <div className="App">
                        <header className="App-header">
                            {auth}
                            <h1 className="App-title">Ticket Wallet</h1>
                        </header>
                        <main>
                            <Route exact={true} path="/" render={() =>
                                <TicketList tickets={JSON.parse(localStorage.getItem('tickets'))} handleDeleteTicket={(ticketId) => console.log("delete " + ticketId)} />
                            }>
                            </Route>
                            <Route path="/tickets/:ticketId" render={({ match }) => {
                                const ticket = JSON.parse(localStorage.getItem('tickets')).find((t) => {
                                    console.log(match.params);
                                    return t.cuid == match.params.ticketId
                                });
                                return (ticket ? <TicketListItem ticket={ticket} onDelete={(ticket) => console.log("delete " + ticket.cuid)} /> :
                                    <h3>This Id does not match any Ticket you own</h3>);
                            }
                            }>
                            </Route>
                        </main>
                    </div >
                </Router >
            </Provider>
        );
    }
};

export default App;
