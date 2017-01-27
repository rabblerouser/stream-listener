'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const stream = require('../');
const consumer = stream.consumer();
const app = express();

app.use(bodyParser.json());
app.post('/events', consumer.processor);

consumer.on('member-registered', event => {
  console.log('Yup, got it!', event);
});

consumer.on('member-created', event => {
  console.log('Yeah, got this one too!', event);
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
