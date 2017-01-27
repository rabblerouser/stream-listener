const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const consumer = stream.consumer({
  eventBroadcaster: 'https://some.aws.url',
  app: app
});

consumer.on('member-registered', event => {
  //business logic
}).catch(error => { console.log('Problem registering listener'); });
