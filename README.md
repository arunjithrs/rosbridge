# rosbridge

### Install dependencies
```
sudo apt-get install -y ros-noetic-rosbridge-server
sudo apt-get install -y ros-noetic-tf2-web-republisher //additional package
```

### Start the service

start the service by running commands

```
roslaunch rosbridge_server rosbridge_websocket.launch
rosrun tf2_web_republisher tf2_web_republisher
```


### run the turtle sim

```
rosrun turtlesim turtlesim_node 
```

open turtle sim in raviz

```
roslaunch turtlebot3_fake turtlebot3_fake.launch
```