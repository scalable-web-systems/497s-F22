# Project Setup

## Create Project Folder

Create project folder first

```bash
mkdir snapbook
cd snapbook
```

## Create React App Folder

Create the client next. We do this from the `snapbook` folder:

```bash
npx create-react-app client
```

If you run this for the first time, you may see:

```bash
Need to install the following packages:
  create-react-app
Ok to proceed? (y)
```

After that is complete, we can change into the `client` folder:

```bash
cd client
```

## Create Posts Service Folder

```bash
mkdir posts
cd posts
npm init -y
npm install --save express cors axios nodemon morgan
```

## Create Comments Service Folder

```bash
mkdir comments
cd comments
npm init -y
npm install --save express cors axios nodemon morgan
```

## Write Posts Service

(1) Update `package.json` to be a module project:

```json
"type": "module",
```

(2) Create `index.js` is `posts` folder.

(3) Write the following in `index.js`:

```js
import express from 'express';
import logger from 'morgan';
import { randomBytes } from 'crypto';

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');

  const { title } = req.body;

  posts[id] = {
    id, title
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
```

(4) Add a script to `package.json`. Replace default script with:

```json
  "scripts": {
    "start": "nodemon index.js"
  },
```

## Write Comments Service

(1) Update `package.json` to be a module project:

```json
"type": "module",
```

(2) Create `index.js` is `comments` folder.

(3) Write the following in `index.js`:

```js
import express from 'express';
import logger from 'morgan';
import { randomBytes } from 'crypto';

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());

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
```

(4) Add a script to `package.json`. Replace default script with:

```json
  "scripts": {
    "start": "nodemon index.js"
  },
```

## Create React Application

(1) Add axios

```bash
cd client
npm install --save axios
```

(2) Do the following:

```bash
cd src
rm *
touch App.js
touch index.js
```

(2.5) From the client directory run `npm start`

(3) Implement `App.js`

```jsx
import React from 'react';

const App = () => {
  return <div>Blog App</div>;
};

export default App;
```

(4) Implement `index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

(5) View http://localhost:3000 in the browser.

## Building Post Submissions (Part 1)

(1) Create new file `PostCreate.js`

(2) Add the following to `PostCreate.js`:

```js
import React from 'react';

const PostCreate = () => {
  return (
    <div>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
```

(3) Extend `App.js` with the following to include the `PostCreate` component:

```js
import React from 'react';
import PostCreate from './PostCreate';

const App = () => {
  return (
    <div>
      <h1>Create Post</h1>
      <PostCreate />
    </div>
  );
};

export default App;
```

At this point, look at http://localhost:3000. It is not pretty. Need to add pretty parts.

(4) Add bootstrap CSS file by going to the Bootstrap website and adding the CDN CSS link to the `public/index.html` page.

Now, we can look at it. http://localhost:3000. Looks nice, but we can do a little better. 

(5) Make additional changes to `App.js`:

```js
import React from 'react';
import PostCreate from './PostCreate';

const App = () => {
  return (
    <div className="container"> <!-- Added className here -->
      <h1>Create Post</h1>
      <PostCreate />
    </div>
  );
};

export default App;
```

## Building Post Submissions (Part 1)

Now, we want to extend the React app to handle events.

(2) First, we need to import `useState` and `axios`. The former is used to maintain *state* in a React component. The latter will be used to communicate to a back-end service.

```js
import React, { useState } from 'react'; // NEW: import useState
import axios from 'axios'; // NEW: import axios

const PostCreate = () => {
  const [title, setTitle] = useState(''); // NEW: create some state

  return (
    <div>
      <form>
        <div className="form-group">
          <!-- The additions are HERE, use of title and setTitle -->
          <label>{title}</label>          
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
```

In the next tutorial we will implement the post request to the upstream `posts` service.