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
        if(this.state.isRegistered===null){
            console.log("check user");
            this.checkUser();
        }
    }

    processUserValidation = () => {
        if(this.state.isRegistered){
            console.log("userObj exists ",this.state.userObj);
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
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            throw new Error(response.status);
        }
    }

    getTickets = () => {
        fetch('http://localhost:3000/users/'+JSON.parse(sessionStorage.getItem("userData")).googleid)
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.results.map(ticket =>(
                {
                    id: `${ticket.id}`,
                    googleid: `${ticket.googleid}`,
                    name: `${ticket.name}`,
                    date: `${ticket.date}`,
                    category: `${ticket.category}`,
                    qrdata: `${ticket.qrdata}`,
                    info: `${ticket.info}`,
                }
            )))
            .then(tickets => this.setState({
                tickets: tickets
            }))
            .catch(error => console.log('Parsing tickets failed', error));
        if(this.state.tickets){
            localStorage.setItem('tickets', JSON.stringify(this.state.tickets));
        }
    };

    newUser = (userData) => {
        fetch('http://localhost:3000/users',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    googleId: userData.googleId,
                    name: userData.name,
                    email: userData.email,
                    token: userData.token
                })
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