;(() => {
  let theme = localStorage.getItem('theme')
  if (!theme) {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
    theme = dark ? 'night' : 'day'
  }
  document.documentElement.classList.add(`theme-${theme}`)
})()
