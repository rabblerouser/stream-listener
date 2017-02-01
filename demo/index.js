'use strict';

// This sets up a server as an end consumer of events.
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// The consumer listens for events at this endpoint
app.post('/events', (req, res) => {
  console.log('Received this event as a request body:', req.body);
  res.sendStatus(200);
});

// It listens on this port
app.listen(3131);


// Load the forwarder lambda function and configure it
const eventForwarder = require('../index').handler;
process.env.RR_CORE_EVENT_ENDPOINT = 'http://localhost:3131/events';

// Now we can simulate an event arriving from kinesis
const event = {
  Records: [
    { kinesis: { data: 'eyJtZXNzYWdlIjogImhpIn0=' } }
  ],
};
eventForwarder(event, null, () => {});
