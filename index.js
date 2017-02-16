'use strict';

const request = require('request-promise');
const handler = require('./src');

const endpoint = process.env.LISTENER_ENDPOINT || 'http://localhost:3000/events';
const authToken = process.env.LISTENER_AUTH_TOKEN || 'secret';
exports.handler = handler(request, endpoint, authToken);
