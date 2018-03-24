export const getLocations = state => state.locations || {}

export const getSelectedLocation = state =>
  getLocations(state)[state.selectedLocationId] || {}

const getCurrentLocation = state => getLocations(state).current

export const getCurrentLocationIsLoading = state =>
  !!getCurrentLocation(state) && !!getCurrentLocation(state).loading

export const getLoadedLocations = state => {
  if (getCurrentLocation(state) && getCurrentLocationIsLoading(state)) {
    const { current, ...locations } = getLocations(state)
    return locations
  } else {
    return getLocations(state)
  }
}
