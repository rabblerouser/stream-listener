process.env.EVENT_ENDPOINT = 'http://localhost:3000/events';
process.env.EVENT_AUTH_TOKEN = 'secret';

const eventForwarder = require('.').handler;
const AWS = require('aws-sdk')

const kinesis = new AWS.Kinesis({
  endpoint: 'http://localhost:4567',
  region: 'ap-southeast-2',
  accessKeyId: 'FAKE',
  secretAccessKey: 'ALSO FAKE',
});

const callback = (err, result) => err ? console.err('Handler failed:', err) : console.log('Handler suceeded:', result);

const fetchAndProcessRecords = (shardIterator) => {
  return kinesis.getRecords({ ShardIterator: shardIterator }).promise().then((records) => {
    records.Records.forEach(record => {
      const event = { Records: [{ kinesis: { data: record.Data } }] };
      eventForwarder(event, null, callback);
    });
    setTimeout(() => fetchAndProcessRecords(records.NextShardIterator), 500);
  });
}

kinesis.describeStream({ StreamName: 'rabblerouser_stream' }).promise()
  .then(stream => {
    console.log('Found rabblerouser_stream...');
    const shardId = stream.StreamDescription.Shards[0].ShardId

    const params = { ShardId: shardId, ShardIteratorType: 'LATEST', StreamName: 'rabblerouser_stream' };
    return kinesis.getShardIterator(params).promise();
  })
  .then(shardIterator => {
    console.log('Polling kinesis for events...');
    return shardIterator.ShardIterator;
  })
  .then(fetchAndProcessRecords)
  .catch(err => {
    console.error(err);
  });
