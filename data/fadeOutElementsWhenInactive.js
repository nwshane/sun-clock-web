let elementsFadeOutTimer

const getElementsToFadeOut = () =>
  document.querySelectorAll('.fade-out-when-inactive')

const setFadeOutTimer = () =>
  setTimeout(() => {
    for (const element of getElementsToFadeOut()) {
      element.className += ' animated fadeOut'
    }
  }, 4000)

export const resetFadeOut = () => {
  getElementsToFadeOut().forEach(element => {
    element.className = element.className.replace(' animated fadeOut', '')
  })
  clearTimeout(elementsFadeOutTimer)
  elementsFadeOutTimer = setFadeOutTimer()
}

export default () => {
  elementsFadeOutTimer = setFadeOutTimer()

  for (const event of ['keydown', 'keyup', 'mousemove']) {
    window.addEventListener(event, resetFadeOut)
  }
}
