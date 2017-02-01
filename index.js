'use strict';

const request = require('request-promise');

exports.handler = (event, context, callback) => {
  event.Records.forEach(record => {
    handleEvent(record.kinesis);
  });
  callback(null, 'ok');
};

function handleEvent(kinesisEvent) {
  const event = JSON.parse(new Buffer(kinesisEvent.data, 'base64'));

  const subscribers = [process.env.RR_CORE_EVENT_ENDPOINT];
  subscribers.forEach(subscriber => {
    const options = {
      method: 'POST',
      uri: subscriber,
      body: event,
      json: true,
      headers: {
        Authorization: process.env.EVENT_AUTH_TOKEN,
      },
    };

    request(options)
      .then(console.log)
      .catch(console.error);
  });
}
