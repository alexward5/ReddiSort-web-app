import React, { Component } from 'react';
import './CardRow.css';

class CardRow extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const substr = this.props.mainText.substring(0,135);
    return (
      <div className='CardRow'>
        <a href={this.props.url} target="_blank" rel="noopener noreferrer">{substr.length === 135 ? `${substr}...` : substr}</a>
      </div>
    );
  }
}

export default CardRow;