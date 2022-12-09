# rosbridge

### Install dependencies
```
sudo apt-get install -y ros-noetic-rosbridge-server
sudo apt-get install -y ros-noetic-tf2-web-republisher
```

### Start the service
roslaunch rosbridge_server rosbridge_websocket.launch
rosrun tf2_web_republisher tf2_web_republisher
