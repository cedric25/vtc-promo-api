const express = require('express')
const morgan = require('morgan')
const log = require('./logger')
const db = require('./db')
const { checkAgainstAllPromo } = require('./promos')

const app = express()

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'))
}

app.get('/', (req, res) => {
  res.send('Welcome to the VTC Promo API')
})

app.post('/promocode', express.json(), (req, res) => {
  log.debug('Handling request for endpoint: POST /promocode', req.body)
  // TODO Middleware with Joi
  db.addPromocode(req.body)
  res.json({
    success: true,
  })
})

app.post('/booking-promo', express.json(), async (req, res) => {
  log.debug('Handling request for endpoint: POST /booking-promo')
  // TODO Middleware with Joi
  const dbContent = db.getDb()
  const applicablePromo = await checkAgainstAllPromo(req.body, dbContent)
  if (applicablePromo) {
    const acceptedAnswer = {
      promocode_name: req.body.promocode_name,
      status: 'accepted',
      avantage: applicablePromo.avantage,
    }
    log.info('Answer:', acceptedAnswer)
    res.json(acceptedAnswer)
  } else {
    const deniedAnswer = {
      promocode_name: req.body.promocode_name,
      status: 'denied',
      reasons: {
        todo: '...'
      }
    }
    log.info('Answer:', deniedAnswer)
    res.json(deniedAnswer)
  }
})

module.exports = app
