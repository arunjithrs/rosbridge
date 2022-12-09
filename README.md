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
rosrun turtlesim turtle_teleop_key 
```


### run the turtlebot3 simulator


open turtlebot3 in gazebo with default house map

```
roslaunch turtlebot3_gazebo turtlebot3_house.launch 
```



open turtle sim in raviz

```
roslaunch turtlebot3_fake turtlebot3_fake.launch
```


ref: http://wiki.ros.org/turtlesim
     https://roslibpy.readthedocs.io/en/latest/reference/index.html#ros-setup