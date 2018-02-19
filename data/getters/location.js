export const getLocations = state => state.locations || {}

export const getSelectedLocation = state =>
  getLocations(state)[state.selectedLocationId] || {}
