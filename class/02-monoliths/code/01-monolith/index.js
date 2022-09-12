import express from 'express';
import logger from 'morgan';
import * as db from './db.js';

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/post', (req, res) => {
  const { title, body } = req.body;

  if (title === undefined || body === undefined) {
    res.status(400).json({
      message: 'Missing title and/or body'
    });
    return;
  }

  const post = db.savePost(title, body);
  res.json(post);
});

app.get('/post', (req, res) => {
  const { postId } = req.body;

  if (postId === undefined) {
    res.status(400).json({
      message: 'Missing postId'
    });
    return;
  }

  const post = db.getPost(postId);

  if (post === null) {
    res.status(404).json({
      message: `Unknown postId ${postId}`
    });
    return;
  }

  res.json(post);
});

app.get('/posts', (req, res) => {
  const posts = db.getPosts();
  res.json(posts);
});

app.get('/post/comments', (req, res) => {
  const { postId } = req.body;

  if (postId === undefined) {
    res.status(400).json({
      message: 'Missing postId'
    });
    return;
  }

  const comments = db.getComments(postId);

  if (comments === null) {
    res.status(404).json({
      message: `Unknown postId ${postId}`
    });
    return;
  }

  res.json(comments);
});

app.post('/comment', (req, res) => {
  const { postId, body } = req.body;

  if (postId === undefined || body === undefined) {
    res.status(400).json({
      message: 'Missing postId and/or body'
    });
    return;
  }

  const comment = db.saveComment(postId, body);

  if (comment === undefined) {
    res.status(404).json({
      message: `Unknown postId ${postId}`
    });
  }

  res.json(comment);
});

app.get('/comment', (req, res) => {
  const { commentId } = req.body;

  if (commentId === undefined) {
    res.status(400).json({
      message: 'Missing commentId'
    });
    return;
  }

  const comment = db.getComment(commentId);

  if (comment === null) {
    res.status(404).json({
      message: `Unknown commentId ${commentId}`
    });
    return;
  }

  res.json(comment);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});