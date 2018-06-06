import queryString from 'query-string'

// added this helper because I was annoyed by having to change the implementation
// of getting query params
export const getQueryParams = () => queryString.parse(window.location.search)
