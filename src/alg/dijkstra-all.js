import dijkstra from "./dijkstra.js";

/** @typedef {import('../graph').Graph} Graph */
/** @typedef {import('../types').NodeIdentifier} NodeIdentifier */
/** @typedef {import('../types').Edge} Edge */
/** @typedef {import('../types').FloydWarshallItem} FloydWarshallItem */

/**
 * @param {Graph} g 
 * @param {(edge: Edge) => number=} weightFunc 
 * @param {(v: NodeIdentifier) => Edge[]=} edgeFunc 
 * @returns {Record<NodeIdentifier, Record<NodeIdentifier, FloydWarshallItem>>}
 */
export default function dijkstraAll(g, weightFunc, edgeFunc) {
  /** @type Record<NodeIdentifier, Record<NodeIdentifier, FloydWarshallItem>> */
  const result = {};
  const ids = g.nodes();
  ids.forEach((id) => {
    result[id] = dijkstra(g, id, weightFunc, edgeFunc);
  });
  return result;
}
