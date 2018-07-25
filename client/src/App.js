import React, { Component } from 'react';
import './App.css';
import TicketList from './components/TicketList';
import PropTypes from 'prop-types';
// import { Provider } from 'react-redux';
import GoogleLogin from 'react-google-login';
import User from './components/user.js';
import { Router } from 'react-router';
import { Route, IndexRoute } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';


class App extends Component {
    /**
     * constructor call, defines state
     */
    constructor(probs){
        super(probs);
        const tickets = [{
            name: "fasdf",
            title: "asdfasdf",
            content: "asdfasdfasdf",
            slug: "123456575",
            cuid: "123412341234",
        }];
        this.state={
            isAuthenticated: false,
            name:'',
            email:''
            , tickets
        };
    }
    /**
     *  signup function, reads the data from the googleresponse and fills the sessionStorage and current State with the userData
     *  TODO POST Request to database to get the ticket data (new method)
     */
    signup = (response) => {
        let postData = {googleid: response.w3.Eea ,name: response.w3.ig, email: response.w3.U3, token: response.Zi.access_token};

        sessionStorage.setItem('userData',JSON.stringify(postData));
        console.log(sessionStorage.getItem('userData'));
        this.setState({isAuthenticated:true,name: postData.name,email: postData.email});
    };
    /**
     *  called on signout, clears the session and resets the state
     */
    signout = () => {
        this.setState({isAuthenticated:false, name:'',email:''});
        sessionStorage.clear();
        console.log(sessionStorage.getItem('userData'));
    };
    /**
     * alerts the error if the googleResponse got an error
     */
    onFailure = (error) => {
        alert(error);
    };
    render() {
        let auth = this.state.isAuthenticated ?
        (
            <div>
                <br/>
                <User/>
                <button onClick={this.signout} className="logoutButton" >
                    Logout
                </button>
            </div>
        ):(
            <div>
                <br/>
                <GoogleLogin
                    clientId="608216264695-93sejhvjsk8dloetsbdiod8gqjmpgutd.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.signup}
                    onFailure={this.onFailure}
                />
            </div>
        );
        return (
            // <Provider store={this.state.store}>
            <Router history={createBrowserHistory()} >
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">{this.state.title}</h1>
                        {auth}

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
};

export default App;
