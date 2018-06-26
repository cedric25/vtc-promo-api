// Run with:
// npx mocha test/promos.spec.js

const { assert } = require('chai')
const {
  checkRestriction,
  checkAgainstOnePromo,
  checkAgainstAllPromo,
} = require('../src/utils')

describe('checkRestriction()', () => {

  describe('When having an age equality restriction met', () => {
    it('Should answer true', () => {
      const promoBody = {
        arguments: {
          age: 40,
        }
      }
      const restrictionKey = '@age'
      const restriction = {
        eq: 40
      }
      const result = checkRestriction(promoBody, restrictionKey, restriction)
      assert.isTrue(result)
    })
  })

  describe('When having an age equality restriction NOT met', () => {
    it('Should answer true', () => {
      const promoBody = {
        arguments: {
          age: 39,
        }
      }
      const restrictionKey = '@age'
      const restriction = {
        eq: 40
      }
      const result = checkRestriction(promoBody, restrictionKey, restriction)
      assert.isFalse(result)
    })
  })

})

describe('checkAgainstOnePromo()', () => {

  describe('When having...', () => {
    it('Should answer true', () => {
      const promoBody = {
        arguments: {
          age: 40,
        }
      }
      const promoDb = {
        restrictions: {
          '@age': {
            eq: 40
          }
        }
      }
      const result = checkAgainstOnePromo(promoBody, promoDb)
      assert.isTrue(result)
    })
  })

})

describe('checkAgainstAllPromo()', () => {

  describe('When having two promos in DB with one matching the request', () => {
    it('Should answer true', () => {
      const promoBody = {
        arguments: {
          age: 40,
        }
      }
      const dbContent = [{
        restrictions: {
          '@age': {
            eq: 39
          }
        }
      }, {
        restrictions: {
          '@age': {
            eq: 40
          }
        }
      }]
      const result = checkAgainstAllPromo(promoBody, dbContent)
      assert.isTrue(result)
    })
  })

})
