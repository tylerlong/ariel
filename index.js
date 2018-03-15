const fs = require('fs')
const d3 = require('d3')
const jsdom = require('jsdom')

const { JSDOM } = jsdom

const jsDom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`)

const body = d3.select(jsDom.window.document).select('body')

const svg = body.append('svg').attr('xmlns', 'http://www.w3.org/2000/svg')
  .attr('width', 500).attr('height', 500)
const g = svg.append('g')

g.append('rect').attr('x', 0).attr('y', 0)
  .attr('width', 200).attr('height', 100)
  .attr('fill', 'white').attr('stroke', 'black')

g.append('text')
  .attr('x', 10)
  .attr('y', 50)
  .attr('font-family', 'sans-serif')
  .attr('font-size', '12px')
  .text('I am a pretty rectangle!')

fs.writeFileSync('test.svg', body.html())
