import React, { Component } from 'react'

export default class Connection extends Component {

    constructor() {
        super();
        this.init_connection();
    }

    state = {connected: false, ros: null, host: "0.0.0.0", port: "9090"};

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
        })
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
