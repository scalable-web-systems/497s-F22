# 01 Basic Services

These notes describes the setup of the basic services necessary for the SnapBook application. In particular, it creates the following services:

- `posts`: a service for handling posts
- `comments`: a service for handling comments
- `client`: a front-end service with a very basic React setup.

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
