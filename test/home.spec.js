const { assert } = require('chai')
const request = require('supertest')
const app = require('../src/app')
const { add } = require('../src/utils')

// --- Unit test
describe('When calling add() with 2 and 2', () => {
  it('Should answer 4', async () => {
    const result = add(2, 2)
    assert.equal(result, 4)
  })
})

// --- Integration test
describe('Test the root path', () => {
  it('It should answer to the GET method', async () => {
    const response = await request(app).get('/')
    assert.equal(response.statusCode, 200)
  })
})
