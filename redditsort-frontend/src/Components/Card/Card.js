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
      shownPosts: new Array(this.props.titles.length).fill(true),
      searchInput: ''
    }
  }

  setPage = (newPage) => {
    this.setState({currentPage: newPage});
  }

  searchCard = (input) => {
    if (input !== this.props.globalSearchInput) {
      this.setState({searchInput: input});
    }
    // const combinedInput = `${this.props.globalSearchInput}${this.state.searchInput}`;
    const combinedInput = input;
    const parsedInput = input.split(' ');
    console.log(parsedInput);
    this.props.titles.forEach((title, index) => {
      if (title.toLowerCase().includes(combinedInput.toLowerCase())) {
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

  componentDidUpdate(prevProps) {
    if (prevProps.globalSearchInput !== this.props.globalSearchInput) {
      this.searchCard(this.props.globalSearchInput);
    }
  }

  hideCard = () => {
    return this.state.shownPosts.every(post => {return post === false}) && this.state.searchInput === '';
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
      <div className={`Card ${this.hideCard() ? 'hidden' : ''}`} >
        <div className="Card--content">
          <h3 className="Card--subreddit">{this.props.subreddit}</h3>
          <input 
            className="Card--search" 
            type="text" 
            placeholder={`Search ${this.props.subreddit}...`} 
            onChange={(e) => {this.searchCard(e.target.value)}}
          />
          <h3 className="Posts--header">Posts</h3>
          <div className="Card--titles">
            {titles}
          </div>
          {currentShownPosts.length > 5 
            &&
            <Pagination 
              totalPosts={currentShownPosts.length} 
              postsPerPage={this.state.postsPerPage} 
              setPage={this.setPage} 
              selected={this.state.currentPage}
            />
          }     
        </div>   
      </div>
    );
  }
}

export default Card;