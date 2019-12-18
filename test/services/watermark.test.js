const assert = require('assert');
const app = require('../../src/app');

describe('\'watermark\' service', () => {
  it('registered the service', () => {
    const service = app.service('watermark');

    assert.ok(service, 'Registered the service');
  });
});
