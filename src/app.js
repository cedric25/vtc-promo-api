const express = require('express')
const morgan = require('morgan')
const log = require('./logger')
const { checkPromo } = require('./utils')

const app = express()

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'))
}

app.post('/promocode', express.json(), (req, res) => {
  log.debug('Handling request for endpoint: POST /promocode')
  res.json({
    success: true,
  })
})

app.post('/booking-promo', express.json(), (req, res) => {
  log.debug('Handling request for endpoint: POST /booking-promo')
  const result = checkPromo(req.body)
  res.json({
    result,
  })
})

module.exports = app
