import React ,{ Component }from 'react'
import { Joystick } from 'react-joystick-component';
import Config from '../Config';


 
export default class Teleoperation extends Component {


    state = {
        connected: false, 
        ros: null, 
        host: Config.ROSBRIDGE_SERVER_HOST, 
        port:  Config.ROSBRIDGE_SERVER_PORT
    };

    constructor() {
        super();
        this.init_connection();
        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.rosTopic = this.rosTopic.bind(this);
        this.rosTwistMsg = this.rosTwistMsg.bind(this);
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
    

    handleMove(event) { 
        let cmd_val = this.rosTopic();
        let twist = {
            linear: {
                x: event.y ,
                y: 0,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: -event.x ,
            }
        };
        
        cmd_val.publish(twist);
    }

    handleStop() {
        console.log('stop') 
        let cmd_val = this.rosTopic();
        let twist = {
            linear: {
                x: 0 ,
                y: 0,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: 0 ,
            }
        };
        
        cmd_val.publish(twist);
    }

    rosTopic() { 
        return new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: '/turtle1/cmd_vel',
            messageType: 'geometry_msgs/Twist'
        })
    }
    
    rosTwistMsg(msg) {
        return new window.ROSLIB.Message(msg);
    }

    render() {
        return (
        <div>     
            
            <div>
                {this.state.connected ? "Connected" : "Not connected"}
            </div>       
            <Joystick size={100} sticky={false} baseColor="#eee" stickColor="#bbb" move={this.handleMove} stop={this.handleStop}></Joystick>
        </div>
        )
    }
    
}
