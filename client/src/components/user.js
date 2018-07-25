import React, { Component } from 'react';

class User extends Component{

    constructor(props) {
        super(props);
        /*
        * TODO (userObj+) googleId, name, email, token nur zum Entwickeln, später aus App holen und verarbeiten
        * */
        this.state = {
            isRegistered: false,
            userObj: {},
            tickets: []
        }
    }
    componentDidMount(){
        console.log("USER MOUNT");
        this.checkUser();
        if(this.state.isRegistered){
            this.getTickets();
        }
    }

    //TODO nur das um alles zu holen(+tickets) und Ticekts dann seperat verarbeiten oder 2mal holen
    //TODO wenn ja dann im error Teil den 40XError anfangen für User existiert nicht und newUser callen
    checkUser = () => {
        fetch('http://localhost:3000/users/'+JSON.parse(sessionStorage.getItem("userData")).googleid)
            .then(this.fetchStatusHandler)
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.result)
            .then(userObj => this.setState({userObj}))
            .catch(function (error){
                console.log('Parsing user failed ',error);
            });
        if(this.state.userObj.length === 0){
            this.setState({isRegistered:true});
            console.log("userObj exists ",this.state.userObj.length);
        }else{
            console.log("creating new user");
            this.newUser(JSON.parse(sessionStorage.getItem("userData")));
        }
    };

    fetchStatusHandler(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            throw new Error(response.status);
        }
    }

    getTickets = () => {
        fetch('http://localhost:3000/users/'+JSON.parse(sessionStorage.getItem("userData").googleid))
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
                tickets
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
            .catch(error => console.log('creating new user failed',error))
    };

    render(){
        let name = JSON.parse(sessionStorage.getItem('userData')).name;
        return <div>User: {name}</div>
    }
}

export default User;