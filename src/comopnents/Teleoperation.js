import React, { Component } from "react";
import { Joystick } from "react-joystick-component";
import Config from "../Config";

export default class Teleoperation extends Component {
  state = {};

  constructor() {
    super();
    this.handleMove = this.handleMove.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.rosTopic = this.rosTopic.bind(this);
    this.rosTwistMsg = this.rosTwistMsg.bind(this);
  }
  connect() {
    try {
      this.props.ros.connect("ws://" + this.state.host + ":" + this.state.port);
    } catch (error) {
      console.log(error);
    }
  }

  handleMove(event) {
    let cmd_val = this.rosTopic();
    let twist = {
      linear: {
        x: event.y,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: -event.x,
      },
    };

    cmd_val.publish(twist);
  }

  handleStop() {
    console.log("stop");
    let cmd_val = this.rosTopic();
    let twist = {
      linear: {
        x: 0,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: 0,
      },
    };

    cmd_val.publish(twist);
  }

  rosTopic() {
    return new window.ROSLIB.Topic({
      ros: this.props.ros,
      // name: '/turtle1/cmd_vel',
      name: "/cmd_vel",
      messageType: "geometry_msgs/Twist",
    });
  }

  rosTwistMsg(msg) {
    return new window.ROSLIB.Message(msg);
  }

  render() {
    return (
      <div>
        {/* <Joystick
          size={100}
          sticky={false}
          baseColor="#eee"
          stickColor="#bbb"
          move={this.handleMove}
          stop={this.handleStop}
        ></Joystick> */}
      </div>
    );
  }
}
