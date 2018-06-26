// Run with:
// npx mocha test/db.spec.js

const { assert } = require('chai')
const db = require('../src/db')

describe('db', () => {

  beforeEach(() => {
    db.resetDb()
  })

  describe('Without initialising db', () => {
    it('Should be an empty array', () => {
      const dbContent = db.getDb()
      assert.deepEqual(dbContent, [])
    })
  })
})
