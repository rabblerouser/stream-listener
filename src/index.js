'use strict';

module.exports = (request, uri, auth) => (event, context, callback) => {
  const promises = event.Records.map(record => {
    const options = {
      method: 'POST',
      uri,
      body: record.kinesis,
      json: true,
      headers: { Authorization: auth },
    };

    return request(options);
  });

  return Promise.all(promises).then(
    () => { callback(null, 'ok'); },
    (err) => { callback(err); }
  );
};
