import express from 'express';
import logger from 'morgan';
import { randomBytes } from 'crypto';
import cors from 'cors';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id, content });
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
