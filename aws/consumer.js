'use strict';
const request = require('request-promise');

let eventTypesListeningTo = {};

/* assuming authenticated and trusted request.*/
function eventProcessor(req, res) {
  const event = req.body;

  if (!event) {
    res.status(500).json({ error: 'something went wrong!' });
  }

  processEvent(event);
  res.send(200);
}

function processEvent(event) {
  const eventType = event.channel;

  const callback = eventTypesListeningTo[eventType];

  if (!callback) {
    res.status(500).json({ error: 'I do not care about this eventType'});
  }
  callback();
  res.send(200);
}

function createListenerEndpoint(app, listeningEndpoint) {
  app.post(listeningEndpoint, eventProcessor);
}

module.exports = function(params) {
  //TODO: validate everything!
  const listeningEndpoint = 'event-listener-random';
  createListenerEndpoint(params.app, listeningEndpoint);

  return {
    on: (eventType, callback) => {
      return request.post({
        url: params.eventBroadcaster
        json: true
        body: { channel: eventType, listeningOn: listeningEndpoint }
      })
      .then(() => {
        eventTypesListeningTo[eventType] = callback;
      });

    }
  };
}
