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
            googleId: '',
            name: '',
            email: '',
            token: '',
            tickets: []
        }
    }
    //TODO nur das um alles zu holen(+tickets) und Ticekts dann seperat verarbeiten oder 2mal holen
    //TODO wenn ja dann im error Teil den 40XError anfangen für User existiert nicht und newUser callen
    checkUser = () => {
        fetch('http://localhost:3000/users/'+this.state.googleId)
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.result)
            .then(userObj => this.setState({userObj}))
            .catch(error => console.log('Parsing tickets failed', error));
        if(this.state.userObj){
            this.setState({isRegistered:true})
        }
    };

    getTickets = () => {
        fetch('http://localhost:3000/users/'+this.state.googleId)
            .then(response => response.json())
            //TODO Properties of TICKETS mappen
            .then(parsedJSON => parsedJSON.results.map(ticket =>(
                {

                }
            )))
            .then(tickets => this.setState({
                tickets
            }))
            .catch(error => console.log('Parsing tickets failed', error))
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

    render();
}