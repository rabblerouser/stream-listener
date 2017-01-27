# SPIKE!!

### Pre-requisites

* [AWS Account all setup]
* [A Kinesis Stream](https://aws.amazon.com/kinesis/streams/)

## To deploy an event broadcaster Lambda
You're going to need to setup:
* [Serverless]

Then run:

`STREAM_ARN="<the-stream-arn>" sls deploy`

_This still does not include runtime registration, so there is no code for the potential registrar lambda._


## Usage - local
To see how the module would work (locally):

1. Run the consumer:

  `node test/index.js`

1. Simulate a call from the broadcaster Lambda.

  ``` bash
  curl -X POST -H "Content-Type: application/json" \
  -d '{ "channel": "registration","sequenceNumber": "49569625073747986051284015760176917265900404709609439234","data": "we are streaming events","approximateArrivalTimestamp": 1485507652.516 }' \
  http://localhost:3000/events
  ```

[Serverless]: https://serverless.com/
[AWS Account all setup]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
