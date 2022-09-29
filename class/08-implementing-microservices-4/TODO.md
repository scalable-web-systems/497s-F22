# 08 TODO

Last time, we created a synchronous version of the SnapBook application. We then created a new version of the application that was asynchronous using an event bus. Today, we are going to finish that off with a new *query* service.

We will focus on the following in this class:

1. We need to finish off the following from Lecture 07:
   - Emitting Post Creation Events
   - Emitting Comment Creation Events
   - Receiving Events in the Posts and Comments Service

2. Create a new query service that will be the sole endpoint for the front-end application to request posts and comments in bulk.

3. Speculate how we might create a service that intercepts comment creation requests to perform some feature that modifies or records some aspect of a comment that would be useful.
