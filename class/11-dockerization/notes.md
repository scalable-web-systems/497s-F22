# Lecture 11 Script

## Preliminaries

It is **important** that you do not have any `node_modules` folders in
any of the service folders. This may cause problems when you try to
run the application inside of a container.

## Create a Network

First, we want to create a network for all the services to communicate
over:

```bash
docker network create sbnet
```

## Dockerize the Event Bus

First, we need to update the event bus code to communicate with the
services that will be running inside of containers. When we create
those containers, they will have a name that we will be able to
reference rather than `localhost`. So, we need to replace `localhost`
with each of the container names that we will eventually create. Here
is the updated version:

```js
app.post("/events", (req, res) => {
  const event = req.body;

  console.log(`event received: ${event}`);

  axios.post("http://posts:4000/events", event).catch((err) => {
    console.log(err.message);
  });

  axios.post("http://comments:4001/events", event).catch((err) => {
    console.log(err.message);
  });

  axios.post("http://query:4002/events", event).catch((err) => {
    console.log(err.message);
  });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
```

Create a new Docker file with the following contents: 

```
# Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Install some depenendencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]
```

Next, create the image and tag it:

```bash
docker build -t timdrichards/event-bus:0.0.1
```

After you built it, you can see it like this:

```bash
docker images
```

Lastly, run the event-bus container:

```bash
docker run --net=sbnet --name eventbus timdrichards/event-bus:0.0.1
```

## Dockerize the Posts Service

Before we create the image for the `posts` service, we need to update
its code to communicate using the internal container names on the
network:

```js
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://eventbus:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});
```

Create a new Docker file with the following contents: 

```
# Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Install some depenendencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]
```

Next, create the image and tag it:

```bash
docker build -t timdrichards/posts:0.0.1
```

After you built it, you can see it like this:

```bash
docker images
```

Lastly, run the posts container:

```bash
docker run --net=sbnet -p 4000:4000 --name posts timdrichards/posts:0.0.1
```

## Dockerize the Comments Service

Before we create the image for the `comments` service, we need to
update its code to communicate using the internal container names on
the network:

```js
app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id, content });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://eventbus:4005/events", {
    type: "CommentCreated",
    data: {
      id,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});
```

Create a new Docker file with the following contents: 

```
# Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Install some depenendencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]
```

Next, create the image and tag it:

```bash
docker build -t timdrichards/comments:0.0.1
```

After you built it, you can see it like this:

```bash
docker images
```

Lastly, run the comments container:

```bash
docker run --net=sbnet  -p 4001:4001 --name comments timdrichards/comments:0.0.1
```

## Dockerize the Query Service

Create a new Docker file with the following contents: 

```
# Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Install some depenendencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]
```

Next, create the image and tag it:

```bash
docker build -t timdrichards/query:0.0.1
```

After you built it, you can see it like this:

```bash
docker images
```

Lastly, run the query container:

```bash
docker run --net=sbnet -p 4002:4002 --name query timdrichards/query:0.0.1
```

## Dockerize the Client Service

Create a new Docker file with the following contents: 

```
# Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Install some depenendencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]
```

Next, create the image and tag it:

```bash
docker build -t timdrichards/client:0.0.1
```

After you built it, you can see it like this:

```bash
docker images
```

Lastly, run the client container. Note, that for the client we want to
map the host port to the container's port so we can access it from a
browser in our local environment.

```bash
docker run --net=sbnet -p 3000:3000 --name query timdrichards/query:0.0.1
```

## How to Make React Re-Render Components

At this point we have had to manually re-render components by
reloading the browser window. This is rather tedious an doesn't really
work like a real application. We want our application to re-render
when a post is made and when a comment is made. To do this, we need to
make some adjustments to our UI architecture.

The adjustments we need to make are to *lift* the state to components
in which we can supply child components shared state that will allow
us to set that state to invoke a re-rendering in that component. Yes,
this sounds a bit confusing, so let's get to the changes.

The first thing we are doing to do is to move the state of the
`PostList`, namely the `posts` state upward into its parent component
which is `App` and then supply that state as a *prop* variable back
into the `PostList` component. Here are the changes to `App` and
`PostList`: 

```jsx

```
