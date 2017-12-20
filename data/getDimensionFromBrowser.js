// Method for getting dimensions of screen from this source:
// https://stackoverflow.com/a/11744120/3115911
const getScreenWidth = () => {
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth

  return x
}

const getScreenHeight = () => {
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    y = w.innerHeight || e.clientHeight || g.clientHeight

  return y
}

const getDimensionFromBrowser = () =>
  Math.min(getScreenWidth(), getScreenHeight())

export default getDimensionFromBrowser
