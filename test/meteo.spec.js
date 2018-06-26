// Run with:
// npx mocha test/meteo.spec.js

const { assert } = require('chai')
const { buildMeteoAnswer } = require('../src/external/meteo')
const weatherAnswerExample = require('./data/lyon-weather-answer-example')

describe('buildMeteoAnswer()', () => {
  describe('When giving a complete answer payload', () => {
    it('Should extract relevant info', () => {
      const result = buildMeteoAnswer(weatherAnswerExample)
      assert.deepEqual(result, {
        main: 'clear',
      })
    })
  })
})
