const fs = require('fs')

const { init, drawTextRect } = require('./src/utils')

const { body, svg } = init()
const g = svg.append('g')

const text = '<AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 快讯：习近平在十三届全国人大一次会议上发表重要讲话。 Browse the commercial free fonts classified as monospaced.>'

drawTextRect(g, text, 100, 100)

fs.writeFileSync('test.svg', body.html())
