import tarjan from "./tarjan.js";

/** @typedef {import('../graph').Graph} Graph */
/** @typedef {import('../types').NodeIdentifier} NodeIdentifier */

/**
 * @param {Graph} g 
 * @returns {NodeIdentifier[][]}
 */
export default function findCycles(g) {
  const items = tarjan(g);
  return items.filter(cmp => cmp.length > 1 || (cmp.length === 1 && g.hasEdge(cmp[0], cmp[0])));
}
