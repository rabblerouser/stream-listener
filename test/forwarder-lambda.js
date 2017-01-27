'use strict';

const lambda = require('../forwarder/handler');

function simulateKinesisEvent(event, context, callback) {
  lambda.broadcast(event, context, callback);
}

let kinesisEvent = {
    "Records": [
        {
            "kinesis": {
                "kinesisSchemaVersion": "1.0",
                "partitionKey": "member-registered",
                "sequenceNumber": "49569625073747986051284015760176917265900404709609439234",
                "data": "d2UgYXJlIHN0cmVhbWluZyBldmVudHM=",
                "approximateArrivalTimestamp": 1485507652.516
            },
            "eventSource": "aws:kinesis",
            "eventVersion": "1.0",
            "eventID": "shardId-000000000000:49569625073747986051284015760176917265900404709609439234",
            "eventName": "aws:kinesis:record",
            "invokeIdentityArn": "arn:aws:iam::xxxxxxxx:role/stream-consumer-spike-dev-ap-southeast-2-lambdaRole",
            "awsRegion": "ap-southeast-2",
            "eventSourceARN": "arn:aws:kinesis:ap-southeast-2:xxxxxxxx:stream/a-stream"
        }
    ]
};

let context = {};
let whatevs = () => {};

simulateKinesisEvent(kinesisEvent, context, whatevs);

setTimeout(function () {
  console.log('haaaaaack');
}, 10000);
