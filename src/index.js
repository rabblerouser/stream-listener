'use strict';

module.exports = (request, uri, auth) => (event, context, callback) => {
  const promises = event.Records.map(record => (
    handleEvent(request, uri, auth, record.kinesis)
  ));

  return Promise.all(promises).then(
    () => callback(null, 'ok'),
    (err) => callback(err)
  );
};

function handleEvent(request, uri, auth, kinesisEvent) {
  const event = JSON.parse(new Buffer(kinesisEvent.data, 'base64'));

  const options = {
    method: 'POST',
    uri,
    body: event,
    json: true,
    headers: {
      Authorization: auth,
    },
  };

  return request(options);
}
