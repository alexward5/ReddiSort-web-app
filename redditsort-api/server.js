require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const simpleOAuth2Reddit = require('simple-oauth2-reddit');
const snoowrap = require('snoowrap');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let redditToken = '';

const reddit = simpleOAuth2Reddit.create({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  state: process.env.STATE,
  duration: 'permanent',
  scope: '*'
});

const getData = async (access_token) => {
  const jsonData = {
    token: access_token,
    posts: [],
    comments: []
  }

  const r = new snoowrap({
    userAgent: 'my user agent',
    clientId: process.env.MY_CLIENT_ID,
    clientSecret: process.env.MY_CLIENT_SECRET,
    accessToken: access_token
  });

  const saved = await r.getMe().getSavedContent({ limit: 800 });
  saved.forEach(post => {
    if (post.title) {
      const postData = { subreddit: post.subreddit_name_prefixed, title: post.title };
      jsonData.posts.push(postData);
    } else {
      const commentData = { subreddit: post.subreddit_name_prefixed, body: post.body };
      jsonData.comments.push(commentData);
    }
  })

    return jsonData;
}

// ROUTES

// Ask the user to authorize.
app.get('/auth/reddit', reddit.authorize);

// Exchange the token for the access token and redirect to app.
app.get('/auth/reddit/callback', reddit.accessToken, (req, res) => {
  redditToken = req.token;
  res.redirect('http://localhost:3001');
});

// get data for client that does not already have token
app.get('/auth/reddit/data', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  if (redditToken !== '') {
    // console.log(redditToken.token.access_token);
    getData(redditToken.token.access_token).then(data => res.json(data));
  } else {
    res.status(404).send({ error: 'token not found' });
  }
});

// if client already has token then get data
app.get('/auth/reddit/data/:token', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  getData(req.params.token).then(data => res.json(data));
});

app.listen(3000, () => {
  console.log('reddit-favorites-api listening on port 3000');
})
