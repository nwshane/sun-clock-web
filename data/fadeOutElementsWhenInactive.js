let elementsFadeOutTimer
let mouseDisappearTimer

const getElementsToFadeOut = () =>
  document.querySelectorAll('.fade-out-when-inactive')

const setFadeOutTimer = () =>
  setTimeout(() => {
    for (const element of getElementsToFadeOut()) {
      element.className += ' animated fadeOut'
    }
  }, 4000)

const setMouseDisappearTimer = () =>
  setTimeout(() => {
    document.body.className += ' body-hide-cursor'
  }, 7000)

export const resetFadeOut = () => {
  getElementsToFadeOut().forEach(element => {
    element.className = element.className.replace(' animated fadeOut', '')
    document.body.className = document.body.className.replace(
      ' body-hide-cursor',
      ''
    )
  })
  clearTimeout(elementsFadeOutTimer)
  clearTimeout(mouseDisappearTimer)
  elementsFadeOutTimer = setFadeOutTimer()
  mouseDisappearTimer = setMouseDisappearTimer()
}

export default () => {
  elementsFadeOutTimer = setFadeOutTimer()
  mouseDisappearTimer = setMouseDisappearTimer()

  for (const event of ['keydown', 'keyup', 'mousemove']) {
    window.addEventListener(event, resetFadeOut)
  }
}
