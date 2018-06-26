const { assert } = require('chai')
const request = require('supertest')
const app = require('../src/app')

describe('POST /promocode route', () => {
  describe('When calling with no payload', () => {
    it('Should answer with success = true', async () => {
      const response = await request(app).post('/promocode')
      assert.equal(response.statusCode, 200)
      assert.deepEqual(response.body, { success: true })
    })
  })
})
