import React, { Component } from 'react'
import Config from '../Config';

export default class Connection extends Component {

    state = {
        connected: false, 
        ros: null, 
        host: Config.ROSBRIDGE_SERVER_HOST, 
        port:  Config.ROSBRIDGE_SERVER_PORT
    };

    constructor() {
        super();
        this.init_connection();
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        
        console.log(this.state.ros)
        this.state.ros.on('connection',()=>{
            console.log("Connection established")
            this.setState({connected: true});
        })

        this.state.ros.on('close',()=>{
            console.log("Connection is closed")
            this.setState({connected: false});

            setTimeout(() => {
                console.log("Reconnecting....")
                this.connect();
            }, Config.RETRY_SECONDS);
        })

        this.connect();

    }

    connect() {
        try { 
            this.state.ros.connect("ws://" + this.state.host + ":"+this.state.port);
        } catch (error) { 
            console.log(error) 
            this.setState({connected: false});
        }
    }
    render() {
        return (
            <div>
                {this.state.connected ? "Connected" : "Not connected"}
            </div>
        )
    }
}
