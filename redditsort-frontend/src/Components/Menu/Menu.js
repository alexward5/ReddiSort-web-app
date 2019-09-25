import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    }
  }

  setInput = (e) => {
    this.props.setInput(e.target.value);
  }

  toggleAll = (e) => {
    const checkboxes = document.querySelectorAll('.subreddit-checkbox');
    if (e.target.classList.contains('show-all-button')) {
      this.props.toggleAllOn();
      checkboxes.forEach(checkbox => {
        checkbox.checked = true;
      })
    } else {
      this.props.toggleAllOff();
      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      })
    }
  }

  startDemo = () => {
    this.props.demoApp();
  }

  render() {
    const subreddits = [];
    if (this.props.subreddits) {
      this.props.subreddits.forEach((sub, index) => {
        subreddits.push(
          <div className='subreddit' key={index}>
            <input 
              className='subreddit-checkbox' 
              id={`checkbox-${index}`} 
              type="checkbox"
              onClick={() => this.props.toggleSubreddit(index)}
              defaultChecked
            />
            <label htmlFor={`checkbox-${index}`}>
              <span className="reddit-prefix">r/ </span>{sub.replace(/r\//g, '')}
            </label>
          </div>
        )
      })
    }
    return (
      <div className="Menu">
        <div className="header">
          <input 
            className="header--search" 
            type="text" 
            placeholder="Search All Saved Content..."
            onChange={this.setInput}
          />
        </div>
        <input onClick={this.props.toggleMenu} type="checkbox" className="openSidebarMenu" id="openSidebarMenu" defaultChecked />
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
            <a href="http://localhost:3000/auth/reddit"><button className="large-button sync-button">Sync Your Account</button></a>
            <button onClick={this.startDemo} className="large-button demo-button">Use Demo Account</button>
            <div className="toggle-group">
              <button onClick={this.toggleAll} className='toggle-button show-all-button'>Show All</button>
              <button onClick={this.toggleAll} className='toggle-button'>Hide All</button>
            </div>
            <div className="sidebarMenu--subreddits">
              {subreddits}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;