import React, { Component } from 'react';
import './Pagination.css';

class Pagination extends Component {

  generateNumbers = () => {
    const pageNumbers = [];
    for (let i=1; i<=Math.ceil(this.props.totalPosts / this.props.postsPerPage); i++) {
      pageNumbers.push(
        <button 
          key={i} 
          onClick={() => this.props.setPage(i)}
          className={this.props.selected === i ? 'selected' : ''}
        >
        {i}
        </button>
      );
    }
    return pageNumbers;
  }
  
  render() {
    return (
      <div className="Pagination">
        {this.generateNumbers()}
      </div>
    );
  }
}

export default Pagination;
