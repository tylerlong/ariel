/*
Alignment:

1 2 3
4 5 6
7 8 9

1: left top
2: top middle
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

  draw1 (svg) {
    const text = svg.append('text').attr('x', 0).attr('y', 0).attr('fill', 'black').attr('text-anchor', 'start').attr('dominant-baseline', 'hanging').attr('transform', `translate(${labelPadding}, ${labelPadding})`)
    let emptyLineHeight = -lineHeight
    R.forEach(line => {
      if (R.isEmpty(line)) {
        emptyLineHeight += lineHeight
      } else {
        text.append('tspan').attr('alignment-baseline', 'hanging').attr('x', 0).attr('dy', lineHeight + emptyLineHeight).text(line)
        emptyLineHeight = 0
      }
    }, this.lines)
  }

  draw4 (svg) {
    const text = svg.append('text').attr('x', 0).attr('y', '50%').attr('fill', 'black').attr('text-anchor', 'start').attr('dominant-baseline', 'central').attr('transform', `translate(${labelPadding}, 0)`)
    const lines = R.pipe(
      R.split('\n'),
      R.map(R.trim)
    )(this.label)
    if (lines.length % 2 === 0) { // even lines, for example: 4
      let emptyLineHeight = -lineHeight / 2
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', 0).attr('dy', -lineHeight - emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.reverse(R.range(0, Math.floor(lines.length / 2))))
      text.append('tspan').attr('x', 0).attr('y', '50%').attr('alignment-baseline', 'central').attr('visibility', 'hidden').text('.')
      emptyLineHeight = -lineHeight / 2
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', 0).attr('dy', lineHeight + emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.range(Math.floor(lines.length / 2), lines.length))
    } else { // odd lines, for example: 5
      let emptyLineHeight = 0
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', 0).attr('dy', -lineHeight - emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.reverse(R.range(0, Math.floor(lines.length / 2))))
      if (R.isEmpty(lines[Math.floor(lines.length / 2)])) {
        text.append('tspan').attr('x', 0).attr('y', '50%').attr('alignment-baseline', 'central').attr('visibility', 'hidden').text('.')
      } else {
        text.append('tspan').attr('x', 0).attr('y', '50%').attr('alignment-baseline', 'central').text(lines[Math.floor(lines.length / 2)])
      }
      emptyLineHeight = 0
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', 0).attr('dy', lineHeight + emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.range(Math.floor(lines.length / 2) + 1, lines.length))
    }
  }

  draw5 (svg) {
    const text = svg.append('text').attr('x', '50%').attr('y', '50%').attr('fill', 'black').attr('text-anchor', 'middle').attr('dominant-baseline', 'central')
    const lines = R.pipe(
      R.split('\n'),
      R.map(R.trim)
    )(this.label)
    if (lines.length % 2 === 0) { // even lines, for example: 4
      let emptyLineHeight = -lineHeight / 2
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', '50%').attr('dy', -lineHeight - emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.reverse(R.range(0, Math.floor(lines.length / 2))))
      text.append('tspan').attr('x', '50%').attr('y', '50%').attr('alignment-baseline', 'central').attr('visibility', 'hidden').text('.')
      emptyLineHeight = -lineHeight / 2
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', '50%').attr('dy', lineHeight + emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.range(Math.floor(lines.length / 2), lines.length))
    } else { // odd lines, for example: 5
      let emptyLineHeight = 0
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', '50%').attr('dy', -lineHeight - emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.reverse(R.range(0, Math.floor(lines.length / 2))))
      if (R.isEmpty(lines[Math.floor(lines.length / 2)])) {
        text.append('tspan').attr('x', '50%').attr('y', '50%').attr('alignment-baseline', 'central').attr('visibility', 'hidden').text('.')
      } else {
        text.append('tspan').attr('x', '50%').attr('y', '50%').attr('alignment-baseline', 'central').text(lines[Math.floor(lines.length / 2)])
      }
      emptyLineHeight = 0
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', '50%').attr('dy', lineHeight + emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.range(Math.floor(lines.length / 2) + 1, lines.length))
    }
  }

  draw6 (svg) {
    const text = svg.append('text').attr('x', '100%').attr('y', '50%').attr('fill', 'black').attr('text-anchor', 'end').attr('dominant-baseline', 'central').attr('transform', `translate(-${labelPadding}, 0)`)
    const lines = R.pipe(
      R.split('\n'),
      R.map(R.trim)
    )(this.label)
    if (lines.length % 2 === 0) { // even lines, for example: 4
      let emptyLineHeight = -lineHeight / 2
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', '100%').attr('dy', -lineHeight - emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.reverse(R.range(0, Math.floor(lines.length / 2))))
      text.append('tspan').attr('x', '100%').attr('y', '50%').attr('alignment-baseline', 'central').attr('visibility', 'hidden').text('.')
      emptyLineHeight = -lineHeight / 2
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', '100%').attr('dy', lineHeight + emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.range(Math.floor(lines.length / 2), lines.length))
    } else { // odd lines, for example: 5
      let emptyLineHeight = 0
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', '100%').attr('dy', -lineHeight - emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.reverse(R.range(0, Math.floor(lines.length / 2))))
      if (R.isEmpty(lines[Math.floor(lines.length / 2)])) {
        text.append('tspan').attr('x', '100%').attr('y', '50%').attr('alignment-baseline', 'central').attr('visibility', 'hidden').text('.')
      } else {
        text.append('tspan').attr('x', '100%').attr('y', '50%').attr('alignment-baseline', 'central').text(lines[Math.floor(lines.length / 2)])
      }
      emptyLineHeight = 0
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', '100%').attr('dy', lineHeight + emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.range(Math.floor(lines.length / 2) + 1, lines.length))
    }
  }
}

export default Label
