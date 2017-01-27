# SPIKE!!

## Usage
To see how the module would work (locally):

1. Install dependecies:

  `npm i`

1. Run the consumer:

  `node test/consumer-client.js`

1. Simulate an event sent by the [forwarder lambda](forwarder/handler.js).

  

  1. In a different shell, run:

    `node test/forwarder-lambda.js`

  1. Simulate a `member-registered` event sent by the [forwarder lambda](forwarder/handler.js).

    ``` bash
    curl -X POST -H "Content-Type: application/json" \
    -d '{ "channel": "member-registered","sequenceNumber": "49569625073747986051284015760176917265900404709609439234","data": "we are streaming events","approximateArrivalTimestamp": 1485507652.516 }' \
    http://localhost:3000/events
    ```

  1. Simulate a `member-created` event sent by the [forwarder lambda](forwarder/handler.js).

    ``` bash
    curl -X POST -H "Content-Type: application/json" \
    -d '{ "channel": "member-created","sequenceNumber": "49569625073747986051284015760176917265900404709609439333","data": "we are streaming events","approximateArrivalTimestamp": 1485507652.519 }' \
    http://localhost:3000/events
    ```

[Serverless]: https://serverless.com/
[AWS Account all setup]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html

## To deploy an event broadcaster Lambda

### Pre-requisites

* [AWS Account all setup]
* [A Kinesis Stream](https://aws.amazon.com/kinesis/streams/)
* [Serverless]

Then run:

`STREAM_ARN="<the-stream-arn>" sls deploy`

_This still does not include runtime registration, so there is no code for the potential registrar lambda._


## Pending
* Setup a consumer with an internet-facing endpoint.
* Hardcode the endpoint vs eventType
* Be consistent with the names.
