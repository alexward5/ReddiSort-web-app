import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const titles = this.props.titles.map((title, index) => (
      <p key={index}>{title}</p>
    ));
    return (
      <div className="Card" >
        <div className="Card--content">
          <h3>{this.props.subreddit}</h3>
          {titles}
        </div>
        
      </div>
    );
  }
}

export default Card;