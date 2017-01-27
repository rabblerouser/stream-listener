'use strict';

var forwarder = require('./forwarder');

exports.broadcast = function(event, context, callback) {
  forwarder.broadcast(event);
  callback(null, 'ok');
};
