const fs = require('fs')
const d3 = require('d3')
const jsdom = require('jsdom')

const { rectSize } = require('./src/index')

const text = '<I am a pretty rectangle! <!DOCTYPE html><html><body></body></html> Browse the commercial free fonts classified as monospaced.>'

const size = rectSize(text)

const { JSDOM } = jsdom

const jsDom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`)

const body = d3.select(jsDom.window.document).select('body')

const svg = body.append('svg').attr('xmlns', 'http://www.w3.org/2000/svg')
  .attr('width', 1000).attr('height', 500)
const g = svg.append('g')

g.append('rect').attr('x', 0).attr('y', 0)
  .attr('width', size.width).attr('height', size.height)
  .attr('fill', 'white').attr('stroke', 'black')

g.append('text')
  .attr('x', 0)
  .attr('y', 9)
  .attr('font-family', 'monospace')
  .attr('font-size', '12px')
  .attr('line-height', '1')
  .text(text)

fs.writeFileSync('test.svg', body.html())
