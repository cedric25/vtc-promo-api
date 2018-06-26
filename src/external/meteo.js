const rp = require('request-promise')
const log = require('../logger')

const API_KEY = process.env.WEATHER_API_KEY || 'd0562f476913da692a065c608d0539f6'

function buildWeatherUrl (endpoint) {
  return `http://api.openweathermap.org/data/2.5${endpoint}&units=metric&APPID=${API_KEY}`
}

async function getWeatherInTown (cityName) {
  const url = buildWeatherUrl(`/weather?q=${cityName}`)
  try {
    const weatherAnswer = await rp(url)
    const weatherJsonAnswer = JSON.parse(weatherAnswer)
    log.debug('weatherAnswer', weatherJsonAnswer)
    return buildMeteoAnswer(weatherJsonAnswer)
  } catch (err) {
    log.error('Fail to call weather API...', err)
  }
}

function buildMeteoAnswer (weatherJsonAnswer) {
  return {
    skyState: weatherJsonAnswer.weather[0].main.toLowerCase(),
    temperature: weatherJsonAnswer.main.temp,
  }
}

module.exports = {
  getWeatherInTown,

  // Exported for test purpose only
  buildMeteoAnswer,
}
