# 03 Event Bus

These notes cover the following:

1. A synchronous communication strategy to minimize requests from the browser. In particular, we modify the `posts` service to communicate directly to the `comments` service to minimize the number of requests coming from the browser.
2. An asynchronous communication strategy to make communication between services loosely coupled. That is, rather than have services tightly bound to specific other services, we introduce an event bus service that will be responsible for managing event messages between services.

## Request Minimization Strategies

Bring up the application from the previous notes. Yes, this requires you to run `npm start` in each of the service folders.

Load the application up in the browser at http://localhost:3000.

Open the *Network* tab in the developer tools for the particular browser you are using. Click on the XHR tab. Reload the application in the browser.

There is problem with what we implemented. See the XHR requests in the browser. There are lots of requests.

How would we reduce the number of requests?

Create a synchronous micro service solution. Make a GET request to the posts service and have the posts service send a request to the comments service, assemble them with the relevant posts and then send them back to the browser.

PROS

- conceptually easy to understand

CONS

- dependencies between services
- inter-service request failures
- still making requests to the comments service
- creates a web of requests

## Create a Branch

**NOTE**: Before proceeding create a git branch called `sync`. We will use this branch to develop the synchronous version of this application. This will allow us to come back to our current version later on.

## Synchronous Micro-Service Communication

Let us update the `posts` service to communicate with the `comments` service to implement this optimization. We do this by updating the `/posts` endpoint in the `posts` service like so:

```js
app.get('/posts', async (req, res) => {
  const postsAndComments = {};
  
  for (let key in posts) {
    const post = posts[key];
    const commentsReq = await axios.get(
      `http://localhost:4001/posts/${post.id}/comments`
    );

    postsAndComments[key] = {
      ...post,
      comments: commentsReq.data,
    };
  }

  res.send(postsAndComments);
});
```

## Refactor Client with Upstream Service Changes

Next, we need to update the `client` to make the proper request. We will need to change the `PostList` and `CommentList` components.

First, change the `PostList` service to pass the comments coming in from the `posts` service with the additional comments data. This only requires us to change the `renderedPosts` function to pass the post comments to the `CommentList` component.

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
          <!-- Change Here -->
          <CommentList comments={p.comments} />
          <CommentCreate postId={p.id} />
        </div>
      </div>
    );
  });
```

Next, we need to change the `CommentList` component to handle the new comments data. These are the changes:

1. Add a `comments` argument to the `CommentList` component function.
2. Remove the `fetchComments` function and `useEffect` call.

We end up with this simplification:

```js
const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
```

Now, visit the application at http://localhost:3000 and see that things are working as before, but with *what appears to be an optimization* in the up stream services.

Did we not just move the request overhead to a different part of our application?

## Asynchronous Communication

Next, we are going to implement an event broker/bus to provide asynchronous style communication between back-end services.

If you created a git branch previously to implement the synchronous communication model, then change your branch back to where you were working previously. Otherwise, make the following changes:

Revert the `posts` service back to its original form before we added the synchronous upstream communication.

```js
app.get('/posts', (req, res) => {
  res.send(posts);
});
```

We also need to revert the `PostList` client component's `renderedPosts` function to:

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
          <CommentList postId={p.id} />
          <CommentCreate postId={p.id} />
        </div>
      </div>
    );
  });
```

And finally, revert `CommentList` back to:

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
```

Always test your changes to make sure things are working properly.

## Create Event Broker

Now on to creating the event broker/bus service!

Create a new directory called `event-bus`:

```bash
mkdir event-bus
cd event-bus
npm init -y
npm install --save express nodemon axios morgan
```

Update the `package.json` file to include the module type:

```json
...
"type": "module"
...
```

And the start script:

```json
  "scripts": {
    "start": "nodemon index.js"
  },
```

Next, create an `index.js` file for the service:

```bash
touch index.js
```

Add the boilerplate imports and express setup:

```js
import express from 'express';
import logger from 'morgan';
import axios from 'axios';

const app = express();

app.use(logger('dev'));
app.use(express.json());
```

Next, add an empty post endpoint:

```js
app.post('/events', (req, res) => {
  res.send({ status: 'OK' });
});
```

Now, add the code to start the service on port 4005:

```js
app.listen(4005, () => {
  console.log('Listening on 4005');
});
```

At this point, you can run the service with `npm start` and it will be
running on port 4005.

Lastly, fill out the body of the event-bus service to send to all
other services the event the event-bus receives.

```js
app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event).catch(err => {
    console.log(err.message);
  });
  
  axios.post('http://localhost:4001/events', event).catch(err => {
    console.log(err.message);
  });
  
  axios.post('http://localhost:4002/events', event).catch(err => {
    console.log(err.message);
  });

  res.send({ status: 'OK' });
});
```

The full code is:

```js
import express from 'express';
import logger from 'morgan';
import axios from 'axios';

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event).catch(err => {
    console.log(err.message);
  });
  
  axios.post('http://localhost:4001/events', event).catch(err => {
    console.log(err.message);
  });
  
  axios.post('http://localhost:4002/events', event).catch(err => {
    console.log(err.message);
  });

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
```

## Emitting Post Creation Events

We now need to start outfitting our services with event support. Let
us start with the `posts` service.

To do this, we need to edit the `index.js` file in the `posts`
directory. First, We are going to make sure we import the axios
library at the top of this file:

```js
import axios from 'axios';
```

Next, we are going to refactor the post creation endpoint to emit an
event every time a post is created. We need to do two things:

1. Add an asynchronous call with axios to the event bus. We will use
   `await` here.
2. Add `async` to the event handler function.

The result is this:

```js
app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');

  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id, title
    }
  });
  
  res.status(201).send(posts[id]);
});
```

## Emitting Comment Creation Events

Now need to start outfit our `comment` services with event support. To do this, we need to edit the `index.js` file in the `comments` directory. First, We are going to make sure we import the axios library at the top of this file:

```js
import axios from 'axios';
```

Next, we are going to refactor the comment creation endpoint to emit an event every time a post is created. We need to do two things:

1. Add an asynchronous call with axios to the event bus. We will use
   `await` here.
2. Add `async` to the event handler function.

The result is this:

```js
app.post('/posts/:id/comments', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id, content });

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});
```

## Receiving Events in the Posts and Comments Service

Now we need to handle receiving events in the `posts` service. To do this, we are going to create a new endpoint in `posts/index.js`:

```js
app.post('/events', (req, res) => {
  console.log(req.body.type);
  res.send({});
});
```

We will do the same for `comments/index.js`:

```js
app.post('/events', (req, res) => {
  console.log(req.body.type);
  res.send({});
});
```

Visit the app at http://localhost:3000 and create some posts and comments. Take a look at the output produced by the services.
