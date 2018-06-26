// Run with:
// npx mocha test/promos.spec.js

const { assert } = require('chai')
const {
  checkAgeRestriction,
  checkDateRestriction,
  checkRestriction,
  checkAgainstOnePromo,
  checkAgainstAllPromo,
} = require('../src/utils')

describe('checkAgeRestriction()', () => {

  describe('When having an age equality restriction met', () => {
    it('Should answer true', () => {
      const ageRestriction = {
        eq: 40
      }
      const result = checkAgeRestriction(40, ageRestriction)
      assert.isTrue(result)
    })
  })
  describe('When having an age equality restriction NOT met', () => {
    it('Should answer true', () => {
      const ageRestriction = {
        eq: 40
      }
      const result = checkAgeRestriction(39, ageRestriction)
      assert.isFalse(result)
    })
  })

  describe('When having just a greater than age restriction', () => {
    // TODO
  })

  describe('When having just a less than age restriction', () => {
    // TODO
  })

})

describe('checkDateRestriction()', () => {

  // TODO Fake time...

  describe('Having an after and a before date restriction', () => {
    describe('When today\'s date is well in-between', () => {
      it('Should answer true', () => {
        const dateRestriction = {
          after: '2017-08-02',
          before: '2018-08-02',
        }
        const result = checkDateRestriction(dateRestriction)
        assert.isTrue(result)
      })
    })
    describe('When promo has not been reached yet', () => {
      it('Should answer false', () => {
        const dateRestriction = {
          after: '2018-08-01',
          before: '2018-09-01',
        }
        const result = checkDateRestriction(dateRestriction)
        assert.isFalse(result)
      })
    })
    describe('When promo belongs to the past', () => {
      it('Should answer false', () => {
        const dateRestriction = {
          after: '2017-08-01',
          before: '2017-10-01',
        }
        const result = checkDateRestriction(dateRestriction)
        assert.isFalse(result)
      })
    })
  })

  describe('Having just an after date restriction', () => {
    // TODO
  })

  describe('Having just a before date restriction', () => {
    // TODO
  })
})

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

  describe('When having an age equality restriction met', () => {
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
