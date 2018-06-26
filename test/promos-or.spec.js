// Run with:
// npx mocha test/promos-or.spec.js

const { assert } = require('chai')
const {
  checkOrRestriction,
} = require('../src/promos')

describe('checkOrRestriction()', () => {

  describe('When having an or restriction', () => {
    describe('When first condition is met', () => {
      it('Should answer true', () => {
        const orRestriction = [{
          '@age': {
            eq: 40
          }
        }, {
          '@age': {
            lt: 30,
            gt: 15
          },
        }]
        const promoBody = {
          arguments: {
            age: 40,
          }
        }
        const currentMeteo = null
        const result = checkOrRestriction(orRestriction, promoBody, currentMeteo)
        assert.isTrue(result)
      })
    })
    describe('When second condition is met', () => {
      it('Should answer true', () => {
        const orRestriction = [{
          '@age': {
            eq: 40
          }
        }, {
          '@age': {
            lt: 30,
            gt: 15
          },
        }]
        const promoBody = {
          arguments: {
            age: 17,
          }
        }
        const currentMeteo = null
        const result = checkOrRestriction(orRestriction, promoBody, currentMeteo)
        assert.isTrue(result)
      })
    })
    describe('When NONE of the two conditions are met', () => {
      it('Should answer false', () => {
        const orRestriction = [{
          '@age': {
            eq: 40
          }
        }, {
          '@age': {
            lt: 30,
            gt: 15
          },
        }]
        const promoBody = {
          arguments: {
            age: 45,
          }
        }
        const currentMeteo = null
        const result = checkOrRestriction(orRestriction, promoBody, currentMeteo)
        assert.isFalse(result)
      })
    })
  })

})
