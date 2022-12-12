import React, { Component } from "react";

export default class Map extends Component {
  constructor() {
    super();
    // this.view_map = this.view_map.bind(this);
  }

  componentDidMount() {
    this.view_map();
  }

  view_map() {
    var viewer = new window.ROS2D.Viewer({
      divID: "nav_div",
      width: 1200,
      height: 600,
    });

    var navClient = new window.NAV2D.OccupancyGridClientNav({
      ros: this.props.ros,
      rootObject: viewer.scene,
      viewer: viewer,
      serverName: "/move_base",
      withOrientation: true,
    });
  }

  render() {
    return (
      <div>
        <div id="nav_div"></div>
      </div>
    );
  }
}
