const bunyan = require('bunyan')

module.exports = bunyan.createLogger({
  name: 'vtc-promo-api',
  streams: [
    {
      level: process.env.LOG_LEVEL || 'info',
      stream: process.stdout,
    },
  ],
})
