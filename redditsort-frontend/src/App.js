import React, { Component } from 'react';
import './App.css';
import Menu from './Components/Menu/Menu';
import Body from './Components/Body/Body';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      savedPosts: '',
      savedComments: '',
      menuOpen: true,
      searchInput: '',
      subreddits: '',
      displaySubreddits: []
    }
  }

  componentDidMount = () => {
    // get number of seconds since token was created
    const tokenAge = (Date.parse(new Date()) - Date.parse(localStorage['reddit-token-date'])) / 1000; 
    if (document.referrer === 'https://www.reddit.com/') {
      this.getData();
      // if token is less than 59 mins old request data with token
    } else if (localStorage.hasOwnProperty('reddit-token-date') && tokenAge < 3540) {
      this.refreshData(localStorage['reddit-token']);
    }
  }

  getData = async () => {
    const response = await fetch('http://localhost:3000/auth/reddit/data');
    const data = await response.json();
    localStorage.setItem('reddit-token', data.token);
    localStorage.setItem('reddit-token-date', new Date());
    console.log(data);
    const commentsCleaned = data.comments.map(comment => ({subreddit: comment.subreddit, body: comment.body.replace(/\n/g, '')}));
    this.setState({savedPosts: data.posts, savedComments: commentsCleaned});
  }

  refreshData = async (token) => {
    const endpoint = `http://localhost:3000/auth/reddit/data/${token}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    localStorage.setItem('reddit-token', data.token);
    localStorage.setItem('reddit-token-date', new Date());
    console.log(data);
    const commentsCleaned = data.comments.map(comment => ({subreddit: comment.subreddit, body: comment.body.replace(/\n/g, '')}));
    this.setState({savedPosts: data.posts, savedComments: commentsCleaned});
  }

  toggleMenu = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }
  
  setInput = (input) => {
    this.setState({searchInput: input});
    // console.log(input);
  }

  parseSubreddits = () => {
    let subreddits = new Set();
    this.state.savedPosts.forEach(post => subreddits.add(post.subreddit));
    this.setState({subreddits: Array.from(subreddits)}, () => {
      this.setState({displaySubreddits: Array(this.state.subreddits.length).fill(true)});
    });  
  }

  toggleSubreddit = (index) => {
    this.setState(st => ({
      displaySubreddits: [
        ...st.displaySubreddits.slice(0, index),
        st.displaySubreddits[index] = !st.displaySubreddits[index],
        ...st.displaySubreddits.slice(index + 1)
      ]
    }))
  }

  toggleAllOn = () => {
    this.setState({displaySubreddits: Array(this.state.subreddits.length).fill(true)});
  }
  
  toggleAllOff = () => {
    this.setState({displaySubreddits: Array(this.state.subreddits.length).fill(false)});
  }

  componentDidUpdate() {
    if (this.state.subreddits === '') {
      this.parseSubreddits();
    }
  }

  render() {
    // const subreddits = this.parseSubreddits(this.state.savedPosts);
    return(
      <div className="App">
        <Menu 
          toggleMenu={this.toggleMenu} 
          setInput={this.setInput}
          subreddits={this.state.subreddits}
          toggleSubreddit={this.toggleSubreddit}
          toggleAllOn={this.toggleAllOn}
          toggleAllOff={this.toggleAllOff}
          refreshData={this.refreshData}
        />
        <Body 
          posts={this.state.savedPosts} 
          comments={this.state.savedComments} 
          menuOpen={this.state.menuOpen}
          globalSearchInput={this.state.searchInput}
          displaySubreddits={this.state.displaySubreddits}
        />
      </div>
    )
  }
}

export default App;
