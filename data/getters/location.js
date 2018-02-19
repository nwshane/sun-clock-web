const getCurrentLocation = state => state.currentLocation

export const getSelectedLatitude = state => getCurrentLocation(state).latitude
export const getSelectedLongitude = state => getCurrentLocation(state).longitude
