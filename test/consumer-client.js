'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


const stream = require('../');
const consumer = stream.consumer();

//Setting up an endpoint so the lambda can notify the consumer.
app.post('/events', consumer.processor);

//Subscribing for events needs 2 things:
// 1. Setup a callback in the consumer so it knows what to do with the event once notified.
// 2. Subscribing to the lambda so when the event occurs the consumer can be notified. 
consumer.on('member-registered', event => {
  console.log('Yup, got it!', event);
});

consumer.on('member-created', event => {
  console.log('Yeah, got this one too!', event);
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
