import React, { Component } from 'react';

class User extends Component{

    constructor(props) {
        super(props);
        /*
        * TODO (userObj+) googleId, name, email, token nur zum Entwickeln, später aus App holen und verarbeiten
        * */
        this.state = {
            isRegistered: null,
            userObj: {},
            tickets: []
        }
    }
    componentDidMount(){
        /*console.log("TEST CREATE");
        this.newUser(JSON.parse(sessionStorage.getItem("userData")));*/
        if(this.state.isRegistered===null){
            console.log("check user");
            this.checkUser();
        }
    }

    processUserValidation = () => {
        if(this.state.isRegistered){
            console.log("userObj exists ");
            this.getTickets();
        }else{
            console.log("creating new user");
            this.newUser(JSON.parse(sessionStorage.getItem("userData")));
        }
    };

    checkUser = () => {
        fetch('http://localhost:3000/users/'+JSON.parse(sessionStorage.getItem("userData")).googleid)
            .then(this.fetchStatusHandler)
            .then(response => this.setState({isRegistered:true}))
            .then(this.processUserValidation)
            .catch(function (error){
                console.log('Parsing user failed ',error);
            });

    };

    fetchStatusHandler(response) {
        console.log("check statuscode", response.status);
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            throw new Error(response.status);
        }
    }

    getTickets = () => {
        console.log("get tickets");
        fetch('http://localhost:3000/users/'+JSON.parse(sessionStorage.getItem("userData")).googleid)
            .then(this.fetchStatusHandler)
            .then(response => response.json())
            .then(parsedJSON => this.setState({tickets: parsedJSON.user.tickets}))
            .then(x => localStorage.setItem('tickets', JSON.stringify(this.state.tickets)))
            //.then(parsedJSON => localStorage.setItem('tickets', parsedJSON.user.tickets))
            .catch(error => console.log('Parsing tickets failed', error));
    };

    newUser = (userData) => {
        fetch('/users/',
            {
                method: 'POST',
                body:{
                    googleid: userData.googleid,
                    name: userData.name,
                    tickets: [],
                    cuid: userData.token
                }
            }
        )
            .then(this.fetchStatusHandler)
            .catch(error => console.log('creating new user failed',error))
    };

    render(){
        let name = JSON.parse(sessionStorage.getItem('userData')).name;
        return <div>User: {name}</div>
    }
}

export default User;