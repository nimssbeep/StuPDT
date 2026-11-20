import test from 'node:test';
import assert from 'node:assert/strict';
import healthHandler from '../health.js';

test('Vercel Serverless Health Handler', async () => {
  let statusCode = 0;
  let jsonResult = null;

  const mockReq = { method: 'GET' };
  const mockRes = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(payload) {
      jsonResult = payload;
      return this;
    }
  };

  await healthHandler(mockReq, mockRes);

  assert.equal(statusCode, 200);
  assert.equal(jsonResult.status, 'healthy');
  assert.ok(jsonResult.timestamp);
});
