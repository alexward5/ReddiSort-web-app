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
    // debugger;
    if (localStorage.hasOwnProperty('reddit-token-date') && localStorage['reddit-token'] !== 'undefined') {
      const tokenAge = (Date.parse(new Date()) - Date.parse(localStorage['reddit-token-date'])) / 1000;
      if (tokenAge < 3540) {
        this.refreshData(localStorage['reddit-token']);
      } 
    } else {
      if (document.referrer === 'https://www.reddit.com/') {
        this.getData();
      }
    }
  }

  getData = async () => {
    // debugger;
    const response = await fetch('http://localhost:3000/auth/reddit/data');
    const data = await response.json();
    console.log('GETTING DATA');
    console.log(data);
    localStorage.setItem('reddit-token', data.token);
    localStorage.setItem('reddit-token-date', new Date());
    console.log(data);
    const commentsCleaned = data.comments.map(comment => ({subreddit: comment.subreddit, body: comment.body.replace(/\n/g, '')}));
    this.setState({savedPosts: data.posts, savedComments: commentsCleaned});
  }

  refreshData = async (token) => {
    const endpoint = `http://localhost:3000/auth/reddit/data/${token}`;
    console.log('REFRESH ENDPOINT:' + endpoint);
    const response = await fetch(endpoint);
    const data = await response.json();
    localStorage.setItem('reddit-token', data.token);
    localStorage.setItem('reddit-token-date', new Date());
    console.log(data);
    const commentsCleaned = data.comments.map(comment => ({subreddit: comment.subreddit, body: comment.body.replace(/\n/g, '')}));
    this.setState({savedPosts: data.posts, savedComments: commentsCleaned});
  }

  demoApp = () => {
    this.setState({
      savedPosts: '',
      savedComments: '',
      searchInput: '',
      subreddits: '',
      displaySubreddits: []
    }, async () => {
      const response = await fetch('http://localhost:3000/auth/reddit/demo');
      const data = await response.json();
      console.log(data);
      const commentsCleaned = data.comments.map(comment => ({subreddit: comment.subreddit, body: comment.body.replace(/\n/g, '')}));
      this.setState({savedPosts: data.posts, savedComments: commentsCleaned});
    })
  }

  toggleMenu = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }
  
  setInput = (input) => {
    this.setState({searchInput: input});
    // console.log(input);
  }

  // create a set if all unique subreddit names, and set their value in display array to true
  parseSubreddits = () => {
    let subreddits = new Set();
    if (this.state.savedPosts) {
      this.state.savedPosts.forEach(post => subreddits.add(post.subreddit));
      this.setState({subreddits: Array.from(subreddits)}, () => {
        this.setState({displaySubreddits: Array(this.state.subreddits.length).fill(true)});
      });  
    }
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.menuOpen === prevState.menuOpen) {
      if (!this.state.subreddits) {
        this.parseSubreddits();
      }
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
          demoApp={this.demoApp}
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
