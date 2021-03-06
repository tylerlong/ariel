/*
Alignment:

1 2 3
4 5 6
7 8 9

1: left top
2: middle top
3: right top
4: left middle
5: middle middle
6: right middle
7: left bottom
8: middle bottom
9: right bottom
*/

import * as R from 'ramda'

import { lineHeight, labelPadding } from './constants'

class Label {
  constructor (label, alignment = 5) {
    this.label = label
    this.alignment = alignment
  }

  draw (svg) {
    this[`draw${this.alignment}`](svg)
  }

  get lines () {
    return R.pipe(
      R.split('\n'),
      R.map(R.trim)
    )(this.label)
  }

  draw123789 (svg, x, y, textAnchor, baseline, translateX, translateY, dyMultiplier, linesOrder) {
    const text = svg.append('text').attr('x', x).attr('y', y).attr('fill', 'black').attr('text-anchor', textAnchor).attr('dominant-baseline', baseline).attr('transform', `translate(${translateX}, ${translateY})`)
    let emptyLineHeight = -lineHeight
    R.forEach(line => {
      if (R.isEmpty(line)) {
        emptyLineHeight += lineHeight
      } else {
        text.append('tspan').attr('alignment-baseline', baseline).attr('x', x).attr('dy', (lineHeight + emptyLineHeight) * dyMultiplier).text(line)
        emptyLineHeight = 0
      }
    }, linesOrder(this.lines))
  }

  draw123 (svg, x, textAnchor, translateX) {
    this.draw123789(svg, x, 0, textAnchor, 'hanging', translateX, labelPadding, 1, R.identity)
  }

  draw1 (svg) {
    this.draw123(svg, 0, 'start', labelPadding)
  }

  draw2 (svg) {
    this.draw123(svg, '50%', 'middle', 0)
  }

  draw3 (svg) {
    this.draw123(svg, '100%', 'end', -labelPadding)
  }

  draw456 (svg, x, textAnchor, translateX) {
    const text = svg.append('text').attr('x', x).attr('y', '50%').attr('fill', 'black').attr('text-anchor', textAnchor).attr('dominant-baseline', 'central').attr('transform', `translate(${translateX}, 0)`)
    const drawLines = (emptyLineHeight, rangeSelector, dyMultiplier) => {
      const lines = rangeSelector(this.lines)
      R.forEach(line => {
        if (R.isEmpty(line)) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', x).attr('dy', (lineHeight + emptyLineHeight) * dyMultiplier).attr('alignment-baseline', 'central').text(line)
          emptyLineHeight = 0
        }
      })(lines)
    }
    if (this.lines.length % 2 === 0) { // even lines, for example: 4
      drawLines(-lineHeight / 2, R.pipe(R.slice(0, Math.floor(this.lines.length / 2)), R.reverse), -1)
      text.append('tspan').attr('x', x).attr('y', '50%').attr('alignment-baseline', 'central').attr('visibility', 'hidden').text('.')
      drawLines(-lineHeight / 2, R.slice(Math.floor(this.lines.length / 2), this.lines.length), 1)
    } else { // odd lines, for example: 5
      drawLines(0, R.pipe(R.slice(0, Math.floor(this.lines.length / 2)), R.reverse), -1)
      const middleLine = R.nth(Math.floor(this.lines.length / 2), this.lines)
      if (R.isEmpty(middleLine)) {
        text.append('tspan').attr('x', x).attr('y', '50%').attr('alignment-baseline', 'central').attr('visibility', 'hidden').text('.')
      } else {
        text.append('tspan').attr('x', x).attr('y', '50%').attr('alignment-baseline', 'central').text(middleLine)
      }
      drawLines(0, R.slice(Math.floor(this.lines.length / 2) + 1, this.lines.length), 1)
    }
  }

  draw4 (svg) {
    this.draw456(svg, 0, 'start', labelPadding)
  }

  draw5 (svg) {
    this.draw456(svg, '50%', 'middle', 0)
  }

  draw6 (svg) {
    this.draw456(svg, '100%', 'end', -labelPadding)
  }

  draw789 (svg, x, textAnchor, translateX) {
    this.draw123789(svg, x, '100%', textAnchor, 'baseline', translateX, -labelPadding, -1, R.reverse)
  }

  draw7 (svg) {
    this.draw789(svg, 0, 'start', labelPadding)
  }

  draw8 (svg) {
    this.draw789(svg, '50%', 'middle', 0)
  }

  draw9 (svg) {
    this.draw789(svg, '100%', 'end', -labelPadding)
  }
}

export default Label
