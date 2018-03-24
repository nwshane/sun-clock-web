import Store, { thunk } from 'repatch'
import locations from './locations'

export default (state = {}) =>
  new Store(
    Object.assign(
      {},
      {
        selectedLocationId: '1',
        locations,
        clockDate: new Date(),
        rateOfClockDateChange: 3600 * 24,
        sunriseDate: null,
        sunsetDate: null,
        error: null,
        interval: null
      },
      state
    )
  ).addMiddleware(thunk)
