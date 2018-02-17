'use strict';

module.exports = (request, uri, auth, console) => (event, context, callback) => {
  console.log(`event-forwarder lambda received ${event.Records.length} event(s)`);
  const promises = event.Records.map((record, index) => {
    console.log(`Forwarding event ${index}`);
    console.log(`    partitionKey: ${record.kinesis.partitionKey}`);
    console.log(`    sequenceNumber: ${record.kinesis.sequenceNumber}`);
    const options = {
      method: 'POST',
      uri,
      body: record.kinesis,
      json: true,
      headers: { Authorization: auth },
    };

    return request(options)
      .then(() => console.log(`Received success response from API for event ${record.kinesis.sequenceNumber}`))
      .catch((e) => {
        console.error(`Error sending event to API. Event: ${record.kinesis.sequenceNumber}, Error: ${e}`);
        throw e;
      });
  });

  return Promise.all(promises).then(
    () => { callback(null, 'ok'); },
    (err) => { callback(err); }
  );
};
