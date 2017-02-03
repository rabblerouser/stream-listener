'use strict';

const handler = require('../');

describe('handler', () => {
  let request;
  let callback;
  const event = {
    Records: [
      { kinesis: { data: new Buffer(JSON.stringify({ some: 'event' })).toString('base64') } },
    ],
  };

  beforeEach(() => {
    request = sinon.stub();
    callback = sinon.spy();
  })

  it('POSTs the event and succeeds when the POSTing succeeds', () => {
    return handler(request, 'example.com/events', 'secret')(event, null, callback).then(() => {
      expect(request).to.have.been.calledWith({
        method: 'POST',
        uri: 'example.com/events',
        body: { some: 'event' },
        json: true,
        headers: {
          Authorization: 'secret',
        },
      });
      expect(callback).to.have.been.calledWith(null, 'ok')
    });
  });

  it('fails when POSTing fails', () => {
    request.returns(Promise.reject('Error!'));

    return handler(request, '', '')(event, null, callback).then(() => {
      expect(callback).to.have.been.calledWith('Error!');
    });
  });
});
