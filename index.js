const fs = require('fs')

const { rectSize, createBody } = require('./src/utils')
const { textY, fontFamily, fontSize, lineHeight } = require('./src/constants')

const body = createBody()
const svg = body.append('svg').attr('xmlns', 'http://www.w3.org/2000/svg')
  .attr('width', 1500).attr('height', 500)
const g = svg.append('g')

const text = '<jeep did Google is grea! 快讯：习近平在十三届全国人大一次会议上发表重要讲话。 Browse the commercial free fonts classified as monospaced.>'

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
