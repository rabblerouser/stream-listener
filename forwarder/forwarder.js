'use strict';
var _ = require('lodash');
var request = require('request-promise');

var subscribers = {
  'member-registered': [process.env.RR_CORE_EVENT_ENDPOINT]
};

function handleEvent(kinesisEvent) {
  var event = JSON.parse(new Buffer(kinesisEvent.data, 'base64').toString('ascii'));

  console.log('processing event:', event);
  notifySubscribers(event);
}

function notifySubscribers(event) {
  var relevantSubscribers = _.get(subscribers, event.type);

  if (_.isEmpty(relevantSubscribers)) {
    console.log('No one cares about this eventType:', event.type);
  }

  _.each(relevantSubscribers, notify(event));
}

function notify(event) {
  return function(subscriber) {
    var options = {
      method: 'POST',
      uri: subscriber,
      body: event,
      json: true
    };
    // console.log('notifying...', options);
    request(options)
    .then(console.log)
    .catch(console.log); //send error somewhere.
  };
}

module.exports = {
  broadcast : function(event) {
    event.Records.forEach(function(record) {
      handleEvent(record.kinesis);
    });
  }
};
