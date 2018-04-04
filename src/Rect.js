import uuid from 'uuid/v1'

class Rect {
  constructor (x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  draw (g) {
    const id = uuid()
    const clipPath = g.append('defs').append('clipPath').attr('id', `rect-${id}`) // https://stackoverflow.com/a/7273346/862862
    clipPath.append('rect').attr('x', this.x).attr('y', this.y).attr('width', this.w).attr('height', this.h)
    g.append('rect').attr('x', this.x).attr('y', this.y).attr('width', this.w).attr('height', this.h).attr('fill', 'white').attr('stroke', 'black').attr('stroke-width', 2).attr('clip-path', `url(#rect-${id})`)
  }
}

export default Rect
