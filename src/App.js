 import './App.css';
import Connection from './comopnents/Connection';
import Footer from './comopnents/Footer';
import Header from './comopnents/Header';
import RobotState from './comopnents/RobotState';
import Teleoperation from './comopnents/Teleoperation';
import Config from './Config';
 
import React, { Component } from 'react'
import Map from './comopnents/Map';

export default class App extends Component {

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
      <div className="App">
        <Header></Header>  
        <div className='page-wrapper'> 
          <div className='page-right-wrapper'> 
          <RobotState ros={this.state.ros}></RobotState>
          <Map ros={this.state.ros}></Map>
        </div> 
          <div className='page-left-wrapper'> 
            <Teleoperation ros={this.state.ros}></Teleoperation>
          </div> 
        </div>  
        <Footer></Footer>
      </div>
    );
  }
}
 