#!/bin/bash

set -e

echo 'CLEANING'
rm -rf node_modules

echo 'INSTALLING DEPENDENCIES'
npm install --production

echo 'RUNNING TESTS'
npm test

echo 'PACKAGING THE CODE'
zip -r rabblerouser_event_forwarder.zip index.js src node_modules/ -x __tests__

echo 'UPLOADING TO S3'
aws s3 cp rabblerouser_event_forwarder.zip s3://rabblerouser-artefacts/lambdas/rabblerouser_event_forwarder.zip
