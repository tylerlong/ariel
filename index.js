const fs = require('fs')

const { createBody, drawTextRect } = require('./src/utils')

const body = createBody()
const svg = body.append('svg').attr('xmlns', 'http://www.w3.org/2000/svg')
  .attr('width', 1500).attr('height', 500)
const g = svg.append('g')

const text = '<AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 快讯：习近平在十三届全国人大一次会议上发表重要讲话。 Browse the commercial free fonts classified as monospaced.>'

drawTextRect(g, text, 100, 100)

fs.writeFileSync('test.svg', body.html())
