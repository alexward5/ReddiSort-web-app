import React, { Component } from 'react';
import './Card.css';
import CardRow from '../CardRow/CardRow';
import Pagination from '../Pagination/Pagination';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      postsPerPage: 5,
      shownPosts: new Array(this.props.titles.length).fill(true)
    }
  }

  setPage = (newPage) => {
    this.setState({currentPage: newPage});
  }

  searchCard = (e) => {
    this.props.titles.forEach((title, index) => {
      if (title.toLowerCase().includes(e.target.value)) {
        this.setState(st => ({
          shownPosts: [
            ...st.shownPosts.slice(0, index),
            st.shownPosts[index] = true,
            ...st.shownPosts.slice(index + 1)
          ]
        }))
      } else {
        this.setState(st => ({
          shownPosts: [
            ...st.shownPosts.slice(0, index),
            st.shownPosts[index] = false,
            ...st.shownPosts.slice(index + 1)
          ]
        }))
      }
    });
  }

  getShownPosts = () => {
    const currentShownPosts = [];
    this.state.shownPosts.forEach((shown, index) => {
      if (shown === true) {
        currentShownPosts.push(this.props.titles[index]);
      }
    });
    return currentShownPosts;
  }

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentShownPosts = this.getShownPosts();
    const currentPosts = currentShownPosts.slice(indexOfFirstPost, indexOfLastPost);
    const titles = currentPosts.map((title, index) => (
      <CardRow mainText={title} key={index} />
    ));
    return (
      <div className="Card" >
        <div className="Card--content">
          <h3 className="Card--subreddit">{this.props.subreddit}</h3>
          <input 
            className="Card--search" 
            type="text" 
            placeholder={`Search ${this.props.subreddit}...`} 
            onChange={this.searchCard}
          />
          <div className="Card--titles">
            {titles}
          </div>
          {currentShownPosts.length > 5 
            &&
            <Pagination totalPosts={currentShownPosts.length} postsPerPage={this.state.postsPerPage} setPage={this.setPage} />
          }
          
        </div>
        
      </div>
    );
  }
}

export default Card;