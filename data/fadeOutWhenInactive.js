let elementsToFadeOut = []

const setFadeOutTimer = elements => {
  return setTimeout(() => {
    for (const element of elements) {
      console.log('fade out', element)
      element.className += ' animated fadeOut'
    }
  }, 2000)
}

let elementsFadeOutTimer = setFadeOutTimer(elementsToFadeOut)

export const resetFadeOut = () => {
  elementsToFadeOut.forEach(element => {
    element.className = element.className.replace(' animated fadeOut', '')
  })
  clearTimeout(elementsFadeOutTimer)
  elementsFadeOutTimer = setFadeOutTimer(elementsToFadeOut)
}

if (typeof window === 'object') {
  const events = ['mousemove']

  for (const event of events) {
    window.addEventListener(event, resetFadeOut)
  }
}

export default element => {
  elementsToFadeOut = elementsToFadeOut.concat(element)
}
