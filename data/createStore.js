import Store, { thunk } from 'repatch'
import locations from './locations'

export default (state = {}) =>
  new Store(
    Object.assign(
      {},
      {
        selectedLocationId: 'current',
        locations,
        clockDate: new Date(),
        sunriseDate: null,
        sunsetDate: null,
        loading: true,
        error: null,
        interval: null
      },
      state
    )
  ).addMiddleware(thunk)
