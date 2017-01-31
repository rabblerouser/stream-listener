#!/bin/bash

set -e

echo 'CLEANING'
rm -rf node_modules

echo 'INSTALLING DEPENDENCIES'
npm install --production

echo 'RUNNING TESTS'
npm test

echo 'PACKAGING THE CODE'
zip -r rabblerouser_stream_listener_lambda.zip forwarder/ node_modules/

echo 'UPLOADING TO S3'
aws s3 cp rabblerouser_stream_listener_lambda.zip s3://rabblerouser-artefacts/lambdas/stream_listener/rabblerouser_stream_listener_lambda.zip
