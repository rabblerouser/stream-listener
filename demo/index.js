'use strict';

// This sets up a server as an end consumer of events.
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// The consumer listens for events at this endpoint
app.post('/events', (req, res) => {
  console.log('Received this event as a request body:', req.body);
  console.log('Received this authorization:', req.header('Authorization'));
  res.sendStatus(200);
});

// It listens on this port
app.listen(3131);


// Load the forwarder lambda function and configure it
const eventForwarder = require('../index').handler;
process.env.EVENT_ENDPOINT = 'http://localhost:3131/events';
process.env.EVENT_AUTH_TOKEN = 'some secret string';

// Now we can simulate an event arriving from kinesis
const data = { hello: 'world!' }
const event = {
  Records: [
    { kinesis: { data: new Buffer(JSON.stringify(data)).toString('base64') } }
  ],
};
eventForwarder(event, null, () => {});
