import React, { Component } from 'react'
import * as Three from 'three';

export default class RobotState extends Component {

    state = {
        x: 0,
        y: 0,
        orientation: 0,
        linear_velocity: 0,
        angular_velocity: 0,
    }

    getRobotState() {

        // create a pos subscriber
        let pose_subscriber = new window.ROSLIB.Topic({
            ros: this.props.ros,
            name: "/amcl_pose",
            messageType: "geometry_msgs/PoseWithCovarianceStamped"
        });

        // create pose callback
        pose_subscriber.subscribe((message)=> {
            this.setState({
                x: message.pose.pose.position.x.toFixed(2), 
                y: message.pose.pose.position.y.toFixed(2), 
                orientation: this.getOrientationFromQuaternion(message.pose.pose.orientation).toFixed(2), 
            })
        })


        // create odom subscriber
        let odom_subscriber = new window.ROSLIB.Topic({
            ros: this.props.ros,
            name: "/odom",
            messageType: "nav_msgs/Odometry"
        })

        odom_subscriber.subscribe((message)=> {
            this.setState({
                linear_velocity: message.twist.twist.linear.x.toFixed(2), 
                angular_velocity: message.twist.twist.angular.z.toFixed(2), 
            })
        })
    }

    getOrientationFromQuaternion(ros_q) {
        var q = new Three.Quaternion(
            ros_q.x,
            ros_q.y,
            ros_q.z,
            ros_q.w
        )
        // convert this to Roll, Pitch, Yaw
        var RPY = new Three.Euler().setFromQuaternion(q);
        return RPY["_z"] * (180 / Math.PI);
    }

    componentDidMount(){
        this.getRobotState();
    }

    render() {
        return (
            <div>

            <h4>Position</h4>
            <p>x: {this.state.x}, y: {this.state.y}, Orientation: {this.state.orientation}</p>


            <h4>Velocities</h4>
            <p>Linear Velocity: {this.state.linear_velocity}</p>
            <p>Angular Velocity: {this.state.angular_velocity}</p>
            </div>
            
        )
    }
}
