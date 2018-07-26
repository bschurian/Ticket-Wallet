import React, { Component } from 'react';

class User extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isRegistered: null,
            userObj: {},
            tickets: [],
        }
    }
    componentDidMount(){
        if(this.state.isRegistered === null){
            this.checkUser();
        }else if(this.state.isRegistered === false){
            this.processUserValidation();
        }
    }

    processUserValidation = () => {
        if(this.state.isRegistered){
            this.getTickets();
        }else{
            this.newUser(JSON.parse(sessionStorage.getItem("userData")));
        }
    };

    checkUser = () => {
        fetch('http://localhost:3000/users/'+JSON.parse(sessionStorage.getItem("userData")).googleid)
            .then((x)=>{console.log(x);return x})
            .then(this.fetchStatusHandler)
            .then(x => this.setState({isRegistered:true}))
            .then(this.processUserValidation)
            .catch(error => this.gotError(error));

    };

    gotError = (error) => {
        console.log("user doesn't exist", error);
        this.setState({isRegistered:false});
        this.processUserValidation()
    };

    fetchStatusHandler(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            throw new Error(response.status);
        }
    }

    getTickets = () => {
        console.log('http://localhost:3000/users/'+JSON.parse(sessionStorage.getItem("userData")).googleid);
        fetch('http://localhost:3000/users/'+JSON.parse(sessionStorage.getItem("userData")).googleid)
            .then(response => response.json())
            .then(parsedJSON => this.setState({tickets: parsedJSON.user.tickets}))
            // .then(x => localStorage.setItem('tickets', JSON.stringify(this.state.tickets)))
            .then(parsedJSON => localStorage.setItem('tickets', parsedJSON.user.tickets))
            .catch(error => console.log('Parsing tickets failed', error));
    };

    newUser = (userData) => {
        fetch('/users/',
            {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({user:{googleid: userData.googleid,
                        name: userData.name,
                        tickets: [],
                        cuid: userData.token}})
            }
        )
            .then(this.fetchStatusHandler)
            .catch(error => console.log('creating new user failed',error))
    };

    render(){
        let name = JSON.parse(sessionStorage.getItem('userData')).name;
        return <div>{name}</div>
    }
}

export default User;