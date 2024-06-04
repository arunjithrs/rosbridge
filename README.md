# rosbridge

### Install dependencies

```
sudo apt-get install -y ros-noetic-rosbridge-server
sudo apt-get install -y ros-noetic-tf2-web-republisher //additional package
sudo apt-get install -y ros-noetic-robot-state-publisher
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

### run package

download the robot_pose_publisher from ros repo and rename the package file and build it using `catkin_make`

1. rename package name(folder name)
2. in package.xml rename the <name>
3. in CmakeList rename the project name on line 2

then run the below command

```
rosrun riotu_robot_pose_publisher riotu_robot_pose_publisher
```

for enabling navigation
```
sudo apt-get install ros-kinetic-dwa-local-planner
```

### running commands

```
roslaunch rosbridge_server rosbridge_websocket.launch
roslaunch turtlebot3_gazebo turtlebot3_house.launch
rosrun riotu_robot_pose_publisher riotu_robot_pose_publisher
roslaunch turtlebot3_navigation  turtlebot3_navigation.launch map_file:=/home/innovationlabs/Documents/map/tb3_house_map.yaml
```

### start webapp

```
npm run start
```
