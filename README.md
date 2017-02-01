# rabblerouser-event-forwarder

A lambda function that receives all events from a kinesis stream and forwards them to APIs over HTTP

## Background.
AWS Kinesis consumers need to be constantly polling the stream for new events (with a dedicated thread for it).
NodeJS will struggle with this as it is single-threaded.

This is a lambda function that can do that dedicated job, and forward events to consumers via HTTP.

![Solution](docs/event-pub-sub.png)

## Local development
Run the tests like this:

```sh
npm test
```

Run the demo to see if it works. If it prints a request body, then it probably works.

```sh
npm run demo
```

## Deployment
There is a build pipeline for this project, it publishes the zipped code to an s3 bucket.

Actual deployment of this lambda function requires a few moving parts, such as IAM roles, a kinesis stream to subscribe
to, and a consumer endpoint where events should be forwarded to.

With that in mind, the easiest way to deploy this right now is as part of a whole Rabble Rouser stack. See
[rabblerouser-infra](https://github.com/rabblerouser/rabblerouser-infra) for how to do that.
