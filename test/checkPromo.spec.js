const { assert } = require('chai')
const request = require('supertest')
const app = require('../src/app')

describe('POST /booking-promo route', () => {
  describe('When calling with no payload', () => {
    it('Should answer with a result of true', async () => {
      const response = await request(app).post('/booking-promo')
      assert.equal(response.statusCode, 200)
      assert.deepEqual(response.body, { result: true })
    })
  })
})
