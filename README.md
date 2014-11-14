About
=========

PawPrints is a web application created by the RIT Student Government. 

Original Sources:
[Repository](https://github.com/ritstudentgovernment/petitions)
[Website](https://www.sg.rit.edu/)

The RPI Web Technologies Group has modified the application for use on the Rensselaer campus. 
The purpose of this site is to share ideas and influence decision making by posting petitions. The community votes on the petitions, and once a minimum threshold is reached, a response is issued by an appropriate representative or leader knowledgeable of the issue.


Requirements
============

- Install [Node] +  [Meteor.js]
- Made for Meteor v0.8.3

Usage (Local Development)
=========================

- Copy .env.sample to .env and edit appropriately. All enviornment variables are required. Ensure read permissions on the file (`chmod`).
- Install meteorite `npm install -g meteorite`
- Run `mrt install`
- From the project root directory, run `meteor --settings settings.json`.

Usage (Production Enviornment)
==============================

- Check out the node section of the [config] repository for example systemd files and nginx configuration files.
- For creating an admin user for mongo, read Section 1.2 of this [article].

Contributing
============

- The [roadmap] details planned features by core project maintainers.
- We are open to pull requests! Please follow the coding conventions currently in place.


[Node]:http://nodejs.org/
[Meteor.js]:https://www.meteor.com/
[roadmap]:https://trello.com/b/b6Kyx395/petition-roadmap
[config]:https://github.com/ritstudentgovernment/config
[article]:https://gentlenode.com/journal/meteor-1-deploy-and-manage-a-meteor-application-on-ubuntu-with-nginx/1
