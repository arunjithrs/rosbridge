import React, { Component } from 'react'

export default class RobotState extends Component {

    state = {
        x: 0,
        y: 0,
        orientation: 0,
        linear_velocity: 0,
        angular_velocity: 0,
    }

    // create a pos subscriber
    pos_subscriber = new window.ROSLIB.Topic({
        ros: this.props.ros,
        name: "/amcl_pose",
        messageType: "geometry_msgs/PoseWithCovarianceStamped"
    })

    render() {
        return (
            <div>

            <h4>Position</h4>
            <p>x: {this.state.x}, y: {this.state.y}, Orientation: {this.state.orientation}</p>


            <h4>Velocities</h4>
            <p>Linear Velocity: {this.state.linear_velocity}</p>
            <p>Angular Velocity: {this.state.angular_velocity}</p>
            <p>Orientation Velocity: {this.state.orientation}</p>
            </div>
            
        )
    }
}
