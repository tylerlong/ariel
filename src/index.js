const rectSize = text => {
  const textWidth = text.split('')
    .map(function (c) { return 7.2 })
    .reduce(function (a, b) { return a + b }, 0)
  const textHeight = 12

  const padding = 0
  return { width: textWidth + padding * 2, height: textHeight + padding * 2 }
}

module.exports = { rectSize }
