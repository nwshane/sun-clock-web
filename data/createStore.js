import Store, { thunk } from 'repatch'

export default (state = {}) =>
  new Store(
    Object.assign(
      {},
      {
        selectedLocationId: 'current',
        locations: {
          '1': {
            id: 1,
            name: 'New York',
            latitude: 40.7128,
            longitude: -74.006,
            timeZone: 'America/New_York'
          },
          '2': {
            id: 2,
            name: 'Shanghai',
            latitude: 31.2304,
            longitude: 121.4737,
            timeZone: 'Asia/Shanghai'
          }
        },
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
