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

  static intersect (node, point) {
    const x = node.x
    const y = node.y

    // Rectangle intersection algorithm from:
    // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
    const dx = point.x - x
    const dy = point.y - y
    let w = node.width / 2
    let h = node.height / 2

    let sx, sy
    if (Math.abs(dy) * w > Math.abs(dx) * h) {
      // Intersection is top or bottom of rect.
      if (dy < 0) {
        h = -h
      }
      sx = dy === 0 ? 0 : h * dx / dy
      sy = h
    } else {
      // Intersection is left or right of rect.
      if (dx < 0) {
        w = -w
      }
      sx = w
      sy = dx === 0 ? 0 : w * dy / dx
    }

    return {x: x + sx, y: y + sy}
  }
}

export default Rect
