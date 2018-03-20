const fs = require('fs')

const { rectSize, createBody } = require('./src/index')
const { textY, fontFamily, fontSize, lineHeight } = require('./src/constants')

const body = createBody()
const svg = body.append('svg').attr('xmlns', 'http://www.w3.org/2000/svg')
  .attr('width', 1000).attr('height', 500)
const g = svg.append('g')

const text = '<I am a pretty rectangle! 中华人民共和国万岁！人生如梦，一樽还酹江月。Browse the commercial free fonts classified as monospaced.>'

const size = rectSize(text)
g.append('rect').attr('x', 0).attr('y', 0)
  .attr('width', size.width).attr('height', size.height)
  .attr('fill', 'white').attr('stroke', 'black')

g.append('text')
  .attr('x', 0)
  .attr('y', textY)
  .attr('font-family', fontFamily)
  .attr('font-size', fontSize)
  .attr('line-height', lineHeight)
  .text(text)

fs.writeFileSync('test.svg', body.html())
