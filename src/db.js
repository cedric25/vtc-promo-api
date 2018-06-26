const uuid = require('uuid/v4')

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
        before: '2018-05-02',
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

function resetDb () {
  promocodes = []
}

function addPromocode (newPromocode) {
  // istanbul not happy with that, see later
  // const newPromocodeWithId = { ...newPromocode, id: uuid() }
  const newPromocodeWithId = Object.assign({}, newPromocode, { id: uuid() })
  console.log('newPromocodeWithId', newPromocodeWithId)
  promocodes.push(newPromocodeWithId)
}

module.exports = {
  init,
  getDb,
  resetDb,
  addPromocode,
}
