const get = require('lodash/get')
const log = require('./logger')
const { getWeatherInTown } = require('./external/meteo')

/**
 * promoBody example:
   {
     promocode_name: 'WeatherCode',
     arguments: {
       age: 25,
       meteo: { town: 'Paris' },
     }
   }
 */
async function checkAgainstAllPromo (promoBody, dbContent) {

  // (Debatable choice to ask meteo here...)
  const requestTown = get(promoBody.arguments, 'meteo.town')
  let currentMeteo = null
  if (requestTown) {
    currentMeteo = await getWeatherInTown(requestTown)
  }

  const isOnePromoApplicable = dbContent.some(promoDb => {
    return checkAgainstOnePromo(promoBody, promoDb, currentMeteo)
  })
  return isOnePromoApplicable
}

function checkAgainstOnePromo (promoBody, promoDb, currentMeteo) {
  const allRestrictionsMet = Object.keys(promoDb.restrictions).every(restrictionKey => {
    return checkRestriction(promoBody, restrictionKey, promoDb.restrictions[restrictionKey], currentMeteo)
  })
  return allRestrictionsMet
}

function checkRestriction (promoBody, restrictionKey, restriction, currentMeteo) {
  switch (restrictionKey) {

    case '@age':
      return checkAgeRestriction(promoBody.arguments.age, restriction)

    case '@date':
      return checkDateRestriction(restriction)

    case '@meteo':
      return checkMeteoRestriction(currentMeteo, restriction)

    default:
      log.warn(`/!\\ Unknown restrictionKey: ${restrictionKey}`)
      // return false
      return true
  }
}

function checkAgeRestriction (requestAge, ageRestriction) {
  let restrictionOk = true
  if (ageRestriction.eq) {
    restrictionOk = restrictionOk && requestAge === ageRestriction.eq
  } else {
    if (ageRestriction.lt) {
      restrictionOk = restrictionOk && requestAge < ageRestriction.lt
    }
    if (ageRestriction.gt) {
      restrictionOk = restrictionOk && requestAge > ageRestriction.gt
    }
  }
  return restrictionOk
}

function checkDateRestriction (dateRestriction) {
  const today = new Date()
  const afterDate = dateRestriction.after && new Date(dateRestriction.after)
  const beforeDate = dateRestriction.before && new Date(dateRestriction.before)
  if (afterDate && beforeDate) {
    return today.getTime() >= afterDate && today.getTime() <= beforeDate
  } else if (afterDate) {
    return today.getTime() >= afterDate
  } else if (beforeDate) {
    return today.getTime() <= beforeDate
  }
  log.warn(`/!\\ Neither 'after' nor 'before' restriction?...`)
  return true
}

/**
  @meteo: {
    is: 'clear',
    temp: {
      gt: '15', // Celsius here.
    }
  }
 */
function checkMeteoRestriction (currentMeteo, meteoRestriction) {
  if (!currentMeteo) {
    log.warn(`/!\\ Can't check meteo...`)
    return true
  }
  let restrictionOk = true
  if (meteoRestriction.is) {
    restrictionOk = restrictionOk && currentMeteo.main === meteoRestriction.is
  }
  return restrictionOk
}

module.exports = {
  checkAgainstAllPromo,

  // Exported for test purpose only
  checkAgainstOnePromo,
  checkRestriction,
  checkAgeRestriction,
  checkDateRestriction,
}
