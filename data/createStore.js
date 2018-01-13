import Store, { thunk } from 'repatch'

export default () =>
  new Store({
    latitude: null,
    longitude: null,
    clockDate: new Date(),
    sunriseLocalTime: null,
    sunsetLocalTime: null
  }).addMiddleware(thunk)
