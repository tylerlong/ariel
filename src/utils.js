const isFullwidthCodePoint = require('is-fullwidth-code-point')
const jsdom = require('jsdom')
const d3 = require('d3')

const { asciiCharWidth, cjkCharWidth, charHeight, textY, fontFamily, fontSize, lineHeight } = require('./constants')

const charWidth = c => {
  return isFullwidthCodePoint(c.codePointAt()) ? cjkCharWidth : asciiCharWidth
}

const createBody = () => {
  const { JSDOM } = jsdom
  const jsDom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`)
  const body = d3.select(jsDom.window.document).select('body')
  return body
}

const rectSize = text => {
  const textWidth = text.split('')
    .map(char => charWidth(char))
    .reduce(function (a, b) { return a + b }, 0)
  const padding = 0
  return { width: textWidth + padding * 2, height: charHeight + padding * 2 }
}

const drawTextRect = (g, text, x, y) => {
  const size = rectSize(text)
  g.append('rect').attr('x', x).attr('y', x)
    .attr('width', size.width).attr('height', size.height)
    .attr('fill', 'white').attr('stroke', 'black')

  g.append('text')
    .attr('x', x)
    .attr('y', x + textY)
    .attr('font-family', fontFamily)
    .attr('font-size', fontSize)
    .attr('line-height', lineHeight)
    .text(text)
}

module.exports = {
  charWidth,
  createBody,
  rectSize,
  drawTextRect
}
