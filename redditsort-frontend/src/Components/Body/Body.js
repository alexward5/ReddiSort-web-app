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
    // console.log(nextProps.posts);
    return ({ posts: nextProps.posts });
  }

  componentDidUpdate() {
    this.resizeAllGridItems();
    // set timeout so items are resized after the transition
    setTimeout(() => {
      this.resizeAllGridItems();
    }, 250);
  }

  resizeGridItem = (item) => {
    let grid = document.getElementsByClassName("Body")[0];
    let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    let rowSpan = Math.ceil((item.querySelector('.Card--content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    item.style.gridRowEnd = "span "+rowSpan;
  }

  resizeAllGridItems = () => {
    let allItems = document.getElementsByClassName("Card");
    for(let x=0;x<allItems.length;x++){
      this.resizeGridItem(allItems[x]);
    }
  }

  resizeInstance = (instance) => {
    let item = instance.elements[0];
    this.resizeGridItem(item);
  }

  render() {
    // window.onload = this.resizeAllGridItems();
    window.addEventListener("resize", this.resizeAllGridItems);

    let subreddits = new Set();
    let savedPosts = [];
    let cards = [];
    if (this.state.posts) {
      // create a unique set with each subreddit user has saved post from
      this.state.posts.forEach(post => subreddits.add(post.subreddit));
      // convert set to array so we can access index
      const subredditsArr = Array.from(subreddits);
      // create an array of empty arrays to put the posts into, one for each subreddit
      subredditsArr.forEach(() => savedPosts.push([]));
      // add each post to array index corresponding to appropriate subreddit
      this.state.posts.forEach(post => {
        let subIndex = subredditsArr.indexOf(post.subreddit);
        savedPosts[subIndex].push(post.title);
      });
      // create a card for each subreddit
      for (let i=0; i<subredditsArr.length; i++) {
        cards.push(<Card subreddit={subredditsArr[i]} titles={savedPosts[i]} key={i} />)
      }
    }
    return (
      <div className={`Body ${!this.props.menuOpen ? 'menuClosed' : ''}`}>
        {/* {this.state.posts.map(post => (<Card subreddit={post.subreddot} title={post.title} />))} */}
        {cards}
      </div>
    );
  }
}

export default Body;