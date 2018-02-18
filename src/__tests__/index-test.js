'use strict';

const handler = require('../');

describe('handler', () => {
  let request;
  let callback;
  const event = { Records: [{ kinesis: "I'm a kinesis payload" }] };
  const console = { log: _ => _, warn: _ => _, error: _ => _ };

  beforeEach(() => {
    request = sinon.stub();
    callback = sinon.spy();
  })

  it('POSTs the event and succeeds when the POSTing succeeds', () => {
    request.resolves();
    return handler(request, 'example.com/events', 'secret', console)(event, null, callback).then(() => {
      expect(request).to.have.been.calledWith({
        method: 'POST',
        uri: 'example.com/events',
        body: "I'm a kinesis payload",
        json: true,
        headers: {
          Authorization: 'secret',
        },
      });
      expect(callback).to.have.been.calledWith(null, 'ok')
    });
  });

  it('only sends one event at a time', () => {
    let requestInProgress = false;
    request.callsFake(() => {
      if (requestInProgress) {
        return Promise.reject('Expected event-forwarder not to make concurrent requests');
      }
      requestInProgress = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          // After 100ms, the fake request finishes and the promise resolves
          requestInProgress = false;
          resolve();
        }, 100)
      });
    });

    const doubleEvent = { Records: [{ kinesis: "first" }, { kinesis: 'second' }] };
    return handler(request, 'example.com/events', 'secret', console)(doubleEvent, null, callback)
      .then(() => {
        expect(request).to.have.callCount(2);
        expect(callback).to.have.been.calledWith(null, 'ok');
      });
  });

  it('fails when POSTing fails', () => {
    const error = new Error('Error!')
    request.rejects(error);

    return handler(request, '', '', console)(event, null, callback).then(() => {
      expect(callback).to.have.been.calledWith(error);
    });
  });
});
