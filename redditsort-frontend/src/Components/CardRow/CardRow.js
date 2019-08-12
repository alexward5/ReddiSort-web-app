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
      <div className="CardRow">
        {this.props.mainText}
      </div>
    );
  }
}

export default CardRow;