import { PriorityQueue } from '../data/PriorityQueue.js';

/** @typedef {import('../graph').Graph} Graph */
/** @typedef {import('../types').Edge} Edge */
/** @typedef {import('../types').NodeIdentifier} NodeIdentifier */
/** @typedef {import('../types').FloydWarshallItem} FloydWarshallItem */

const DEFAULT_WEIGHT_FUNC = () => 1;

/**
 * 
 * @param {Graph} g 
 * @param {string} source 
 * @param {(edge: Edge) => number} weightFn 
 * @param {(v: NodeIdentifier) => Edge[]} edgeFn 
 * @returns {Record<NodeIdentifier, FloydWarshallItem>}
 */
function runDijkstra(g, source, weightFn, edgeFn) {
  /** @type {Record<NodeIdentifier, FloydWarshallItem>} */
  const results = {};
  const pq = new PriorityQueue();
  let v; 
  /** @type FloydWarshallItem */
  let vEntry;

  /**
   * @param {Edge} edge 
   */
  const updateNeighbors = (edge) => {
    const w = edge.v !== v ? edge.v : edge.w;
    const wEntry = results[w];
    const weight = weightFn(edge);
    const distance = vEntry.distance + weight;

    if (weight < 0) {
      throw new Error(`${"dijkstra does not allow negative edge weights. " +
                      "Bad edge: "}${  edge  } Weight: ${  weight}`);
    }

    if (distance < wEntry.distance) {
      wEntry.distance = distance;
      wEntry.predecessor = v;
      pq.decrease(w, distance);
    }
  };

  g.nodes().forEach((id) => {
    const distance = id === source ? 0 : Number.POSITIVE_INFINITY;
    results[id] = { distance };
    pq.add(id, distance);
  });

  while (pq.size() > 0) {
    v = pq.removeMin();
    vEntry = results[v];
    if (vEntry.distance === Number.POSITIVE_INFINITY) {
      break;
    }

    edgeFn(v).forEach(updateNeighbors);
  }

  return results;
}

/**
 * @param {Graph} g
 * @param {NodeIdentifier} source 
 * @param {((edge: Edge) => number)=} weightFn 
 * @param {((v: NodeIdentifier) => Edge[])=} edgeFn 
 * @returns {Record<NodeIdentifier, FloydWarshallItem>}
 */
export default function dijkstra(g, source, weightFn, edgeFn) {
  return runDijkstra(g, String(source), weightFn || DEFAULT_WEIGHT_FUNC, edgeFn || (v => g.outEdges(v)));
}
