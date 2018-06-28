// Run with:
// npx mocha test/integration/addPromo.spec.js

const { assert } = require('chai')
const request = require('supertest')
const app = require('../../src/app')

describe('POST /promocode route', () => {
  describe('When calling with no payload', () => {
    it('Should answer with success = true', done => {
      const requestBody = {
        name: 'AgeCode',
        avantage: { percent: 10 },
        restrictions: {
          '@age': {
            lt: 50,
          },
          '@date': {
            before: '2018-10-01',
          },
        }
      }
      request(app)
        .post('/promocode')
        .send(requestBody)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert.deepEqual(res.body, { success: true })
          done()
        })
    })
  })
})
