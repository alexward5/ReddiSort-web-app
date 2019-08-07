import React, { Component } from 'react';
import './Body.css';
import Card from '../Card/Card';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps.posts);
    return ({ posts: nextProps.posts });
  }

  render() {
    let subreddits = new Set();
    let posts = [];
    let cards = [];
    if (this.state.posts) {
      // create a unique set with each subreddit user has saved post from
      this.state.posts.forEach(post => subreddits.add(post.subreddit));
      // convert set to array so we can access index
      const subredditsArr = Array.from(subreddits);
      // create an array of empty arrays to put the posts into, one for each subreddit
      subredditsArr.forEach(subreddit => posts.push([]));
      // add each post to array index corresponding to appropriate subreddit
      this.state.posts.forEach(post => {
        let subIndex = subredditsArr.indexOf(post.subreddit);
        posts[subIndex].push(post.title);
      });
      // create a card for each subreddit
      for (let i=0; i<subredditsArr.length; i++) {
        cards.push(<Card subreddit={subredditsArr[i]} titles={posts[i]} key={i} />)
      }
    }
    return (
      <div className="Body">
        {/* {this.state.posts.map(post => (<Card subreddit={post.subreddot} title={post.title} />))} */}
        {cards}
      </div>
    );
  }
}

export default Body;