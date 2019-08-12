import React, { Component } from 'react';
import './Card.css';
import CardRow from '../CardRow/CardRow';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const titles = this.props.titles.map((title, index) => (
      <CardRow mainText={title} key={index} />
    ));
    return (
      <div className="Card" >
        <div className="Card--content">
          <h3 className="Card--subreddit">{this.props.subreddit}</h3>
          {titles}
        </div>
        
      </div>
    );
  }
}

export default Card;