import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <div className="header">
          <input className="header--search" type="text" placeholder="Search All Saved Content..."/>
        </div>
        <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" defaultChecked />
        <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
          <div className="spinner diagonal part-1"></div>
          <div className="spinner horizontal"></div>
          <div className="spinner diagonal part-2"></div>
        </label>
        <div id="sidebarMenu">
          <div className="sidebarMenuInner">
            <div className="logo">
              <span className="logo-1">Reddi</span>
              <span className="logo-2">Sort</span>
            </div>
            <a href="http://localhost:3000/auth/reddit"><button className="sync-button">Sync Your Account</button></a>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;