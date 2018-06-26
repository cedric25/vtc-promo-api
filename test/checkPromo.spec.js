const { assert } = require('chai')
const request = require('supertest')
const app = require('../src/app')
const db = require('../src/db')

describe('POST /booking-promo route', () => {

  beforeEach(() => {
    db.reset()
  })

  describe('When calling with no payload', () => {
    it('Should answer with a result of true', async () => {
      const response = await request(app).post('/booking-promo')
      assert.equal(response.statusCode, 200)
      assert.deepEqual(response.body, { result: true })
    })
  })
})
