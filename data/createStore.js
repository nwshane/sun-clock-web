import Store, { thunk } from 'repatch'
import locations from '~/data/locations'

export default (state = {}) =>
  new Store(
    Object.assign(
      {},
      {
        selectedLocationId: null,
        locations,
        clockDate: null,
        rateOfClockDateChange: 1,
        sunriseDate: null,
        sunsetDate: null,
        error: null,
        interval: null
      },
      state
    )
  ).addMiddleware(thunk)
