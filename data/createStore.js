import Store, { thunk } from 'repatch'

export default () =>
  new Store({
    latitude: null,
    longitude: null,
    clockDate: new Date(),
    sunriseLocalTime: null,
    sunsetLocalTime: null,
    loading: true,
    error: null
  }).addMiddleware(thunk)
