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
      if (restriction.eq) {
        return promoBody.arguments.age === restriction.eq
      }
      break
    // case 'numeric':
    //   return rawValue.trim()
    // case 'date':
    //   return formatDateWithoutMoment(rawValue)
    default:
      console.warn(`/!\\ Unknown restrictionKey: ${restrictionKey}`)
      // return false
      return true
  }
}

module.exports = {
  checkAgainstAllPromo,

  // Exported for test purpose only
  checkAgainstOnePromo,
  checkRestriction,
}
