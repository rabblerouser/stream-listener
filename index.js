'use strict';

const request = require('request-promise');
const handler = require('./src');

const endpoint = process.env.LISTENER_ENDPOINT;
const authToken = process.env.LISTENER_AUTH_TOKEN;
exports.handler = handler(request, endpoint, authToken);
