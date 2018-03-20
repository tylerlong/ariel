const isFullwidthCodePoint = require('is-fullwidth-code-point')

const { asciiCharWidth, cjkCharWidth } = require('./constants')

const charWidth = c => {
  return isFullwidthCodePoint(c.codePointAt()) ? cjkCharWidth : asciiCharWidth
}

module.exports = {
  charWidth
}
