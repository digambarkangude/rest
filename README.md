# Restful API with Unit testing
This repo is functionality complete — and issues welcome!

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- I have used MongoDB Atlas. (Please make sure you are adding connection url into /config/default.json, dev.json and test.json)
- `npm start` to start the local server
- `npm test` to test the application
# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [config](https://github.com/lorenwest/node-config/wiki/Configuration-Files) - For reading configuration files
- [joi](https://github.com/sideway/joi) - For validation input
- [morgan](https://github.com/expressjs/morgan) - For see logs on command line


## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration of central location for configuration/environment variables.
- `controllers` - This folder contains models and routes
-- `models` - This folder contains DB Models
-- `routes/` - This folder contains the route definitions for our API.
- `helpers/` - This folder contains Validation.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `test/` - This folder contains test cases.

