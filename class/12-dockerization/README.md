# 12 Dockerization

This lecture continues the dockerization process of the SnapBook application we worked on in the previous class. We left off with an application that included the dockerization of the following services: 

- client
- comments
- event-bus
- posts
- query

The goal of this lecture is to script the creation of a docker network and contains for each service using *docker compose*. This will allow us to bring up our entire application using a single configuration file and a single command.

You can read the notes for this class in [notes.md](notes.md).
