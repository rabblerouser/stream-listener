'use strict';

const request = require('request-promise');
const handler = require('./src');

exports.handler = handler(request, process.env.EVENT_ENDPOINT, process.env.EVENT_AUTH_TOKEN);
