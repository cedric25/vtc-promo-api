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
function checkAgainstAllPromo (promoBody, dbContent) {
  const isOnePromoApplicable = dbContent.some(promoDb => {
    return checkAgainstOnePromo(promoBody, promoDb)
  })
  return isOnePromoApplicable
}

function checkAgainstOnePromo (promoBody, promoDb) {
  const allRestrictionsMet = Object.keys(promoDb.restrictions).every(restrictionKey => {
    return checkRestriction(promoBody, restrictionKey, promoDb.restrictions[restrictionKey])
  })
  return allRestrictionsMet
}

function checkRestriction (promoBody, restrictionKey, restriction) {
  switch (restrictionKey) {

    case '@age':
      return checkAgeRestriction(promoBody.arguments.age, restriction)

    case '@date':
      return checkDateRestriction(restriction)

    default:
      console.warn(`/!\\ Unknown restrictionKey: ${restrictionKey}`)
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
  console.warn(`/!\\ Neither 'after' nor 'before' restriction?...`)
  return true
}

module.exports = {
  checkAgainstAllPromo,

  // Exported for test purpose only
  checkAgainstOnePromo,
  checkRestriction,
  checkAgeRestriction,
  checkDateRestriction,
}
