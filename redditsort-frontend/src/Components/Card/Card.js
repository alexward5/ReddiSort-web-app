import React, { Component } from 'react';

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
      <div className="Card" style={{border: '1px solid red', fontSize: 15}}>
        <h3>{this.props.subreddit}</h3>
        {titles}
      </div>
    );
  }
}

export default Card;