const uuid = require('uuid/v4')

// TODO Use a files db instead of this in-memory one

let promocodes = []

function init () {
  promocodes.push({
    _id: uuid(),
    name: 'WeatherCode',
    avantage: { percent: 20 },
    restrictions: {
      '@or': [{
        '@age': {
          eq: 40
        }
      }, {
        '@age': {
          lt: 30,
          gt: 15
        },
      }],
      '@date': {
        after: '2017-05-02',
        before: '2018-10-02',
      },
      '@meteo': {
        is: 'clear',
        temp: {
          gt: '15', // Celsius here.
        }
      }
    }
  })
}

function getDb () {
  return promocodes
}

function clear () {
  promocodes = []
}

function reset () {
  promocodes = []
  init()
}

function addPromocode (newPromocode) {
  const newPromocodeWithId = { ...newPromocode, id: uuid() }
  // OR:
  // const newPromocodeWithId = Object.assign({}, newPromocode, { id: uuid() })
  promocodes.push(newPromocodeWithId)
}

module.exports = {
  init,
  getDb,
  clear,
  reset,
  addPromocode,
}
