'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const stream = require('../');

const app = express();

app.use(bodyParser.json());

const consumer = stream.consumer();
app.post('/events', consumer.processor);
app.use(logErrors);
app.get('/', (req, res) => { console.log('hey'); res.sendStatus(200);});
consumer.on('member-registered', event => {
  console.log('Yup, got it!', event);
});

consumer.on('member-created', event => {
  console.log('Yeah, got this one too!', event);
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

function logErrors (err, req, res, next) {
  console.log('error!!!!');
  console.log(err.stack);
  next(err)
}
