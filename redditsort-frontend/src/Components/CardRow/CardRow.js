import React, { Component } from 'react';
import './CardRow.css';

class CardRow extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className='CardRow'>
        <a href={this.props.url} target="_blank" rel="noopener noreferrer">{this.props.mainText}</a>
      </div>
    );
  }
}

export default CardRow;