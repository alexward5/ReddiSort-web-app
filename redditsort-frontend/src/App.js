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
      searchInput: ''
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
    // console.log(data);
    const commentsCleaned = data.comments.map(comment => ({subreddit: comment.subreddit, body: comment.body.replace(/\n/g, '')}));
    this.setState({savedPosts: data.posts, savedComments: commentsCleaned});
  }

  refreshData = async (token) => {
    const endpoint = `http://localhost:3000/auth/reddit/data/${token}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    localStorage.setItem('reddit-token', data.token);
    localStorage.setItem('reddit-token-date', new Date());
    // console.log(data);
    const commentsCleaned = data.comments.map(comment => ({subreddit: comment.subreddit, body: comment.body.replace(/\n/g, '')}));
    this.setState({savedPosts: data.posts, savedComments: commentsCleaned});
  }

  toggleMenu = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }
  
  setInput = (input) => {
    this.setState({searchInput: input});
    console.log(input);
  }

  render() {
    return(
      <div className="App">
        <Menu toggleMenu={this.toggleMenu} setInput={this.setInput} />
        <Body 
          posts={this.state.savedPosts} 
          comments={this.state.savedComments} 
          menuOpen={this.state.menuOpen}
          globalSearchInput={this.state.searchInput}
        />
      </div>
    )
  }
}

export default App;
