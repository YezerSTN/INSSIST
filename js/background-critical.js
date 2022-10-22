;(function init () {
  fixUnexpectedEndOfInput()
})()


function fixUnexpectedEndOfInput () {
  const onError = (error) => {
    const message = error.message.toLowerCase() || ''
    if (!message.includes('unexpected end of input')) { return }
    location.reload()
  }

  window.addEventListener('error', onError)
  setTimeout(() => {
    window.removeEventListener('error', onError)
  }, 5000)
}
