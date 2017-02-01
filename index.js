'use strict';

const request = require('request-promise');
const subscribers = [process.env.RR_CORE_EVENT_ENDPOINT];

exports.handler = (event, context, callback) => {
  event.Records.forEach(record => {
    handleEvent(record.kinesis);
  });
  callback(null, 'ok');
};

function handleEvent(kinesisEvent) {
  const event = JSON.parse(new Buffer(kinesisEvent.data, 'base64').toString('ascii'));

  subscribers.forEach(subscriber => {
    const options = {
      method: 'POST',
      uri: subscriber,
      body: event,
      json: true
    };

    request(options)
      .then(console.log)
      .catch(console.error);
  });
}
