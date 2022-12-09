import React ,{ Component }from 'react'
import { Joystick } from 'react-joystick-component';

 
export default class Teleoperation extends Component {
    state = {}
    

    handleMove() {
        console.log('moving')
    }

    handleStop() {
        console.log('stop')
    }

    render() {
        return (
        <div>            
            <Joystick size={100} sticky={false} baseColor="#eee" stickColor="#bbb" move={this.handleMove} stop={this.handleStop}></Joystick>
        </div>
        )
    }
}
