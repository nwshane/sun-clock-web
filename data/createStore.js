import Store, { thunk } from 'repatch'
import locations from './locations'

const getRandomLocationId = () => {
  const locationKeys = Object.keys(locations)

  return locationKeys[Math.floor(Math.random() * locationKeys.length)]
}

export default (state = {}) =>
  new Store(
    Object.assign(
      {},
      {
        selectedLocationId: getRandomLocationId(),
        locations,
        clockDate: new Date(),
        rateOfClockDateChange: 1,
        sunriseDate: null,
        sunsetDate: null,
        error: null,
        interval: null
      },
      state
    )
  ).addMiddleware(thunk)
