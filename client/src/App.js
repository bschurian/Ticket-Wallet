import React, {Component} from 'react';
import './App.css';
import TicketList from './components/ticket-list';
import GoogleLogin from 'react-google-login';
import User from './components/user.js';

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
    /**
     * constructor call, defines state
     */
    constructor(probs){
        super(probs);
        this.state={
            isAuthenticated: false,
            name:'',
            email:''
        }
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
    /**
     * render function of the App
     */
    render() {
        /*
         * contains the Login Button if no session exists or the LogOut Button when a session exists
         */
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

        return (<div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <h1 className="App-title">Ticket-Wallet</h1>
                    {auth}
                </header>
                <div className="App">
                    <TicketList/>
                </div>
            </div>)

    }
}

export default App;
