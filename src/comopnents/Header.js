import React, { useEffect, useState } from "react";
import Config from "../Config.js";

export default function Header() {
  const [isPopup, setIsPopup] = useState(false);
  const [ipAddress, setIpAddress] = useState(Config.ROSBRIDGE_SERVER_HOST);

  useEffect(() => {
    setIpAddress(localStorage.getItem("ipaddress"));
  }, []);

  return (
    <div className="app-header">
      <div className="top-header-wrapper">
        <div className="top-header-left"></div>
        <div className="top-header-right">
          <ul>
            <li>
              <i className="fas fa-light fa-rotate-right"></i>
            </li>
            <li>
              <i
                className="fas fa-regular fa-gear"
                onClick={() => {
                  setIsPopup(true);
                }}
              ></i>
            </li>
          </ul>
        </div>
      </div>
      {isPopup && (
        <div className="app-popup-wrapper">
          <div className="app-popup-innter">
            <h4>Settings</h4>
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => {
                setIpAddress(e.target.value);
              }}
              placeholder="IP Address(192.168.1.1:9090)"
            />

            <button
              onClick={() => {
                setIsPopup(false);
                localStorage.setItem("ipaddress", ipAddress);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
