const dagre = require('dagre-layout').default
const graphlib = require('graphlibrary')
const fs = require('fs')

const { init, drawTextRect, drawEdge } = require('./src/utils')
const { rectWidth, rectHeight } = require('./src/constants')

// Create a new directed graph
const graph = new graphlib.Graph()

// Set an object for the graph label
graph.setGraph({})

// Default to assigning a new object as a label for each new edge.
graph.setDefaultEdgeLabel(function () { return {} })

// Add nodes to the graph. The first argument is the node id. The second is
// metadata about the node. In this case we're going to add labels to each of
// our nodes.
graph.setNode('kspacey', { label: 'Kevin Spacey', width: rectWidth, height: rectHeight })
graph.setNode('swilliams', { label: 'Saul Williams', width: rectWidth, height: rectHeight })
graph.setNode('bpitt', { label: 'Brad 👨‍👨‍👧 🌺 Pitt', width: rectWidth, height: rectHeight })
graph.setNode('hford', { label: 'Harrison Ford', width: rectWidth, height: rectHeight })
graph.setNode('lwilson', { label: 'Luke Wilson', width: rectWidth, height: rectHeight })
graph.setNode('kbacon', { label: 'Kevin Bacon', width: rectWidth, height: rectHeight })

// Add edges to the graph.
graph.setEdge('kspacey', 'swilliams')
graph.setEdge('swilliams', 'kbacon')
graph.setEdge('bpitt', 'kbacon')
graph.setEdge('hford', 'lwilson')
graph.setEdge('lwilson', 'kbacon')

dagre.layout(graph)

const { body, svg } = init()

const g = svg.append('g')

graph.nodes().forEach(n => {
  const node = graph.node(n)
  drawTextRect(g, node.label, node.x - node.width / 2.0, node.y - node.height / 2.0)
})

graph.edges().forEach(e => {
  const edge = graph.edge(e)
  drawEdge(g, edge.points)
})

fs.writeFileSync('test.svg', body.html())
