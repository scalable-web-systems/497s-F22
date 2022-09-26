# 02 Client Service

These notes cover the completion of the `client` service implemented in React. In particular, it completes the following React components in the `client` service:

- `CommentCreate`: A component for creating comments
- `CommentList`: A component to list comments
- `PostCreate`: A component for creating posts
- `PostList`: A component for listing components

## Building Post Submissions

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

## Building Post Submissions

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

## Completing Post Submissions

(1) We add a new function `onSubmit` that will be used to make a post request to an endpoint passing the form data to that endpoint. We also add the event listener for `onSubmit` to the `<form>` element.

```js
import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  // NEW: create the onSubmit event handler
  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post('http://localhost:4000/posts', {
      title,
    });

    setTitle('');
  };

  return (
    <div>
      <!-- Add the onSubmit event handler to the form element -->
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
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

(2) Now, we can visit http://localhost:3000 again to see it work. Make sure to open up a terminal where the `posts` service is running. Also open the console in the browser to see an error. This is a CORS error which doesn't allow cross communication to a service from a browser application from which it wasn't served. That is, different domain, host, or port than the original browser application.

## Fixing CORS

To fix CORS we need to fix some configuration for both the `comments` and `posts` service. First, we need to install the `cors` library.

(1) Do it for the `posts` service:

```bash
npm install --save cors
```

Do it for the `comments` service:

```bash
npm install --save cors
```

This is going to set a header for specific responses to let the browser know that CORS is allowed.

(2) Next, we need to modify the `posts` service by opening the `posts/index.js` file and adding an import:

```js
import cors from 'cors';
```

and then wire it up as middleware:

```js
app.use(cors());
```

(3) We then do the same for the `comments` service by opening the `comments/index.js` file and adding an import:

```js
import cors from 'cors';
```

and then wire it up as middleware:

```js
app.use(cors());
```

There - we have taken care of CORS.

## Building PostList

We are now going to create a component to display posts.

(1) Create a new file in `src` called `PostList.js` with this:

```js
import React from 'react';

const PostList = () => {
  return <div></div>;
};

export default PostList;
```

(2) Next, update the `src/App.js` to include the `PostList` component.

```js
import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

const App = () => {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <!-- NEW: add this below -->
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};

export default App;
```

(3) Implement `PostList` to get all the posts.

This involves the following:

1. Import `useState` and `useEffect`. `useEffect` is used to call a function when a component is first loaded.
2. Import `axios` to make the call to the `posts` service.
3. Implement a function to make the fetch.
4. Use `useEffect` to call the function to fetch the posts.

The code is this:

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  <!-- This will display the posts in the browser console -->
  console.log(posts);

  return <div></div>;
};

export default PostList;
```

Now, test it out by running it in the browser. Do not forget to open the console to see the posts that are returned by the response.

(4) Now, we are going to replace that `console.log` with the machinery for creating the posts. We will use Bootstrap's *card* class to make things look nice. We do this with the following code fragment:

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
        </div>
      </div>
    );
  });
```

We also update what we return from this component with:

```js
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
```

We use various Bootstrap classes to make things look nice when the browser window is resized. The component in total now looks like this:

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((p) => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={p.id}
      >
        <div className="card-body">
          <h3>{p.title}</h3>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
```

## Adding comments with CommentCreate

Now that we are getting the hang of things, we are going to create these components a little faster and comment on the code.

(1) Create the file `src/CommentCreate.js`:

```js
import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });

    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
```

(2) Now, we add the `CommentCreate` component into each post that is created in `PostList`:

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((p) => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={p.id}
      >
        <div className="card-body">
          <h3>{p.title}</h3>
          <!-- HERE -->
          <CommentCreate postId={p.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
```

## Adding the list of comments with CommentList

Create a new component called `src/CommentList.js`:

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

Then, update `PostList` by adding the `CommentList` component before the `CommentCreate` component:

```js
...
        <div className="card-body">
          <h3>{p.title}</h3>
          <CommentList postId={p.id} />
          <CommentCreate postId={p.id} />
        </div>
...
```

View the application at http://localhost:3000 in the browser.
