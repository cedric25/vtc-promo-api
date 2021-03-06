// Run with:
// npx mocha test/integration/checkPromo.spec.js

const { assert } = require('chai')
const request = require('supertest')
const app = require('../../src/app')
const db = require('../../src/db')

// TODO Mock weather API call with sinon fake http server or extract call to new function and mock this function...

describe('POST /booking-promo route', () => {

  beforeEach(() => {
    db.reset()
  })

  describe('When calling with no payload', () => {
    it('Should answer with a result of true', done => {
      const requestBody = {
        'promocode_name': 'WeatherCode',
        'arguments': {
          'age': 25,
          'meteo': {
            'town': 'Lyon'
          }
        }
      }
      request(app)
        .post('/booking-promo')
        .send(requestBody)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert.deepEqual(res.body, {
            'promocode_name': 'WeatherCode',
            'status': 'accepted',
            'avantage': {
              'percent': 20
            }
          })
          done()
        })
    })
  })
})
