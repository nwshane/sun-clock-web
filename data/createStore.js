import Store, { thunk } from 'repatch'

export default (state = {}) =>
  new Store(
    Object.assign(
      {},
      {
        latitude: null,
        longitude: null,
        clockDate: new Date(),
        sunriseLocalTime: null,
        sunsetLocalTime: null,
        loading: true,
        error: null,
        interval: null
      },
      state
    )
  ).addMiddleware(thunk)
