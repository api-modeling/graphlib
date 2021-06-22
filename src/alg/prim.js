import { Graph } from "../graph.js";
import { PriorityQueue } from "../data/PriorityQueue.js";

/** @typedef {import('../types').Edge} Edge */

/**
 * @param {Graph} g
 * @param {(edge: Edge) => number} weightFunc 
 * @returns {Graph}
 */
export default function prim(g, weightFunc) {
  const result = new Graph();
  const parents = {};
  const pq = new PriorityQueue();
  let v;

  /**
   * @param {Edge} edge 
   */
  function updateNeighbors(edge) {
    const w = edge.v === v ? edge.w : edge.v;
    const pri = pq.priority(w);
    if (pri !== undefined) {
      const edgeWeight = weightFunc(edge);
      if (edgeWeight < pri) {
        parents[w] = v;
        pq.decrease(w, edgeWeight);
      }
    }
  }

  if (g.nodeCount() === 0) {
    return result;
  }

  g.nodes().forEach((id) => {
    pq.add(id, Number.POSITIVE_INFINITY);
    result.setNode(id);
  });

  // Start from an arbitrary node
  pq.decrease(g.nodes()[0], 0);

  let init = false;
  while (pq.size() > 0) {
    v = pq.removeMin();
    if (parents[v]) {
      result.setEdge(v, parents[v]);
    } else if (init) {
      throw new Error(`Input graph is not connected: ${g}`);
    } else {
      init = true;
    }
    const ne = g.nodeEdges(v);
    if (ne) {
      ne.forEach(updateNeighbors);
    }
  }

  return result;
}
