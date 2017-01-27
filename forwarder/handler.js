'use strict';

exports.broadcast = function(event, context, callback) {
  event.Records.forEach(function(record) {
    var event = {
      sequenceNumber: record.kinesis.sequenceNumber,
      channel: record.kinesis.partitionKey,
      data: new Buffer(record.kinesis.data, 'base64').toString('ascii'),
      timestamp: record.kinesis.approximateArrivalTimestamp
    };

    console.log('Broadcast this event:', event);
  });
  callback(null, "message");
};
