const dagre = require('dagre-layout').default
const graphlib = require('graphlibrary')
const fs = require('fs')

const { init, drawTextRect, drawEdge } = require('./src/utils')
const { rectWidth, rectHeight, padding } = require('./src/constants')

// Create a new directed graph
const graph = new graphlib.Graph()

// Set an object for the graph label
graph.setGraph({rankdir: 'TB'})

// Default to assigning a new object as a label for each new edge.
graph.setDefaultEdgeLabel(function () { return {} })

// A-->B
// A-->C
// A-->Z
// A-->Y
// B-->Y
// Z-->Y
// Y-->A

// Add nodes to the graph. The first argument is the node id. The second is
// metadata about the node. In this case we're going to add labels to each of
// our nodes.
graph.setNode('A', { label: 'A', width: rectWidth, height: rectHeight })
graph.setNode('B', { label: 'B', width: rectWidth, height: rectHeight })
graph.setNode('C', { label: 'C', width: rectWidth, height: rectHeight })
graph.setNode('Z', { label: 'Z', width: rectWidth, height: rectHeight })
graph.setNode('Y', { label: 'Y', width: rectWidth, height: rectHeight })
// graph.setNode('kbacon', { label: 'Kevin Bacon', width: rectWidth, height: rectHeight })

// Add edges to the graph.
graph.setEdge('A', 'B')
graph.setEdge('A', 'C')
graph.setEdge('A', 'Z')
graph.setEdge('A', 'Y')
graph.setEdge('B', 'Y')
graph.setEdge('Z', 'Y')
graph.setEdge('Y', 'A')

dagre.layout(graph)

const { body, svg } = init()

const g = svg.append('g')

let minX = 1000
let minY = 1000
let maxX = -1000
let maxY = -1000

graph.nodes().forEach(n => {
  const node = graph.node(n)
  minX = Math.min(minX, node.x - node.width / 2.0)
  minY = Math.min(minY, node.y - node.height / 2.0)
  maxX = Math.max(maxX, node.x + node.width / 2.0)
  maxY = Math.max(maxY, node.y + node.height / 2.0)
  drawTextRect(g, node.label, node.x - node.width / 2.0, node.y - node.height / 2.0)
})

graph.edges().forEach(e => {
  const edge = graph.edge(e)
  for (let i = 0; i < edge.points.length; i++) {
    const point = edge.points[i]
    minX = Math.min(minX, point.x)
    minY = Math.min(minY, point.y)
    maxX = Math.max(maxX, point.x)
    maxY = Math.max(maxY, point.y)
  }
  drawEdge(g, edge.points)
})

console.log(minX, minY, maxX, maxY)

svg.attr('width', maxX - minX + padding * 2).attr('height', maxY - minY + padding * 2)
g.attr('transform', `translate(${padding - minX}, ${padding - minY})`)

fs.writeFileSync('test.svg', body.html())
