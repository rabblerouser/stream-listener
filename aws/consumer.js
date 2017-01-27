'use strict';

let eventTypesListeningTo = {};

/* assuming authenticated and trusted request.*/
function eventProcessor(req, res) {
  const event = req.body;
  if (!event) {
    res.status(500).json({ error: 'something went wrong!' });
  }

  processEvent(event);
  res.sendStatus(200);
}

function processEvent(event) {
  const eventType = event.channel;
  const callback = eventTypesListeningTo[eventType];

  if (!callback) {
    console.log('I do not care about this eventType');
    return;
  }
  callback(event);
}

module.exports = function(params) {
  return {
    on: (eventType, callback) => {
      eventTypesListeningTo[eventType] = callback;
    },
    processor: eventProcessor
  };
}
