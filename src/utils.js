const isFullwidthCodePoint = require('is-fullwidth-code-point')
const jsdom = require('jsdom')
const d3 = require('d3')

const { asciiCharWidth, cjkCharWidth, charHeight, textY, fontFamily, fontSize, lineHeight } = require('./constants')

const charWidth = c => {
  return isFullwidthCodePoint(c.codePointAt()) ? cjkCharWidth : asciiCharWidth
}

const init = () => {
  const { JSDOM } = jsdom
  const jsDom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`)
  const body = d3.select(jsDom.window.document).select('body')
  const svg = body.append('svg').attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('width', 1500).attr('height', 500)
  const marker = svg.append('marker')
    .attr('id', 'arrowhead')
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 9)
    .attr('refY', 5)
    .attr('markerUnits', 'strokeWidth')
    .attr('markerWidth', 8)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')

  marker.append('path')
    .attr('d', 'M 0 0 L 10 5 L 0 10 z')
    .style('stroke-width', 1)
    .style('stroke-dasharray', '1,0')
  return { body, svg }
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
  g.append('rect').attr('x', x).attr('y', y)
    .attr('width', size.width).attr('height', size.height)
    .attr('fill', 'white').attr('stroke', 'black')

  g.append('text')
    .attr('x', x)
    .attr('y', y + textY)
    .attr('font-family', fontFamily)
    .attr('font-size', fontSize)
    .attr('line-height', lineHeight)
    .text(text)
}

const drawEdge = (g, points) => {
  for (let i = 0; i < points.length - 1; i++) {
    const point1 = points[i]
    const point2 = points[i + 1]
    const line = g.append('line').attr('x1', point1.x).attr('y1', point1.y)
      .attr('x2', point2.x).attr('y2', point2.y).attr('stroke', 'black')
    if (i === points.length - 2) {
      line.attr('marker-end', 'url(#arrowhead)')
    }
  }
}

module.exports = {
  charWidth,
  init,
  rectSize,
  drawTextRect,
  drawEdge
}
