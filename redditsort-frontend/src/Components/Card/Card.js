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
      shownPosts: new Array(this.props.posts.length).fill(true),
      searchInput: ''
    }
  }

  // set which page is shown in pagination
  setPage = (newPage) => {
    this.setState({currentPage: newPage});
  }

  searchCard = async (input) => {
    this.setState({currentPage: 1});
    let combinedInput = '';
    if (input !== this.props.globalSearchInput || this.props.globalSearchInput === '') {
      // handle input from card search
      await this.setState({searchInput: input});
      combinedInput = `${this.state.searchInput} ${this.props.globalSearchInput}`;
    } else {
      // handle input from global search
      combinedInput = this.props.globalSearchInput;
    }
    const parsedInput = combinedInput.split(' ');
    this.props.posts.forEach((post, index) => {
      if (parsedInput.every(word => post.title.toLowerCase().includes(word.toLowerCase()))) {
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
        currentShownPosts.push(this.props.posts[index]);
      }
    });
    return currentShownPosts;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.globalSearchInput !== this.props.globalSearchInput) {
      if (prevState.searchInput === '') {
        this.searchCard(this.props.globalSearchInput);
      } else {
        this.searchCard(`${this.props.globalSearchInput} ${prevState.searchInput}`);
      }
    }
    if (prevState.searchInput !== this.state.searchInput) {
      this.props.resizeGrid();
    }
    // if (
    //   prevState.currentPage !== this.state.currentPage && this.state.currentPage < Math.ceil(this.props.posts.length / this.state.postsPerPage)) {
    //   this.props.resizeGrid();
    // }
  }

  hideCard = () => {
    return this.state.shownPosts.every(post => {return post === false}) && this.state.searchInput === '';
  }

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentShownPosts = this.getShownPosts();
    const currentPosts = currentShownPosts.slice(indexOfFirstPost, indexOfLastPost);
    const titles = currentPosts.map((post, index) => (
      <CardRow mainText={post.title} url={post.url} key={index} />
    ));
    return (
      <div className={`Card ${this.hideCard() && 'hidden'} ${!this.props.display && 'hidden'}`} >
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