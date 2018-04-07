import dagre from 'dagre-layout'
import graphlib from 'graphlibrary'

// Create a new directed graph
const graph = new graphlib.Graph({ compound: true })

// Set an object for the graph label
graph.setGraph({
  rankdir: 'TB'
})

// Default to assigning a new object as a label for each new edge.
graph.setDefaultEdgeLabel(function () { return {} })

graph.setNode('A', { label: 'A', width: 400, height: 300 })
graph.setNode('B', { label: 'B', width: 400, height: 300 })

graph.setEdge('A', 'B', { label: 'Hello world', width: 120, height: 60, labelpos: 'c' })

dagre.layout(graph)

graph.nodes().forEach(n => {
  console.log(n)
  console.log(graph.node(n))
})

graph.edges().forEach(e => {
  console.log(e)
  console.log(graph.edge(e))
})
