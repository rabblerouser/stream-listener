'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const stream = require('../');

const app = express();

app.use(bodyParser.json());

const consumer = stream.consumer();
app.post('/events', consumer.processor);

consumer.on('registration', event => {
  console.log('Yup, got it!', event);
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
