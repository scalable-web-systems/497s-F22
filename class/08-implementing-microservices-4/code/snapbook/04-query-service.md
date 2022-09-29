# 04 Query Service

To see how easy it is to create a new service, let us add a service that is entirely responsible for serving the front-end service. We will also make sure that this service is efficient by caching the data it needs. This will be done by listening to events that are published by other services.

**If we were developing a service in an actual system, we may want to create a branch before proceeding :-)**

## Creating the Query Service

Create a new service directory:

```bash
mkdir query
cd query
npm init -y
npm install express cors nodemon
```

Make the necessary changes to the `package.json` file:

```json
  ...
  "type": "module",
  "scripts": {
    "start": "nodemon index.js"
  },
  ...
```

Create `index.js`, the boilerplate, and two endpoints. The first endpoint is intended for incoming requests from an outside client and the second endpoint is for our internal event broker system.

```js
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send({});
});

app.post('/events', (req, res) => {
  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
```

Now, we are going to make the following changes:

1. Create a data structure to store the posts AND comments.
2. Send the posts data structure back for a GET request.
3. Update the posts data structure depending on the event type.

First, we create an object to hold the posts/comments:

```js
const posts = {};
// EXAMPLE POSTS:
/*
{
  'ab12ce': {
    id: 'ab12ce',
    title: 'some title',
    comments: [
      { id: '123456', content: 'a comment' },
      { id: '654321', content: 'another comment' }
    ]
  },
  'de23ec': {
    id: 'de23ec',
    title: 'some title',
    comments: [
      { id: '443322', content: 'a comment' },
      { id: '223344', content: 'another comment' }
    ]
  }
}
*/
```

Next, we complete the implementation of the GET request for the `/posts` endpoint:

```js
app.get('/posts', (req, res) => {
  res.send(posts);
});
```

Next, we implement the `/events` route to handle events of different types:

```js
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
  }

  console.log(posts);

  res.send({ status: 'OK' });
});
```

The completed query service looks like this:

```js
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
  }

  console.log(posts);

  res.send({ status: 'OK' });
});

app.listen(4002, () => {
  console.log('Listending on 4002');
});
```

Note, the React App isn't communicating to the query service just yet. But, you can see that it has been hooked up into our event broker system and is receiving the proper events and updating the posts data structure.

## Connecting the React App to Query Service

This is going to be easy. We are going to make the changes we made before to the synchronous implementation. This includes modifications to both the `PostList` and `CommentList` components.

For `PostList`, we are going to do two things:

- Make a fetch to port 4002 since that is what our query service is running on.
- Pass the comments associated with the returned data directly to `CommentList`

In `PostList`, we change the `fetchPosts` function to be:

```js
  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4002/posts');
    setPosts(res.data);
  };
```

And change the `renderedPosts` assignment to be:

```js
  const renderedPosts = Object.values(posts).map((p) => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={p.id}
      >
        <div className="card-body">
          <h3>{p.title}</h3>
          <CommentList comments={p.comments} />
          <CommentCreate postId={p.id} />
        </div>
      </div>
    );
  });
```

For `CommentList` we can get rid of the fetch entirely. This reduces the component to this:

```js
import React from 'react';

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
```

Trying the application again at http://localhost:3000 shows that everything is up and running with the query service integrated.
