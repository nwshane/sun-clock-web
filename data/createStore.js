import Store, { thunk } from 'repatch'

export default () =>
  new Store({
    latitude: null,
    longitude: null
  }).addMiddleware(thunk)
