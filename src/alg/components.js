/** @typedef {import('../graph').Graph} Graph */
/** @typedef {import('../types').NodeIdentifier} NodeIdentifier */

/**
 * @param {Graph} g 
 * @returns {NodeIdentifier[][]}
 */
export default function components(g) {

  /** @type Record<NodeIdentifier, boolean> */
  const visited = {};
  /** @type NodeIdentifier[][] */
  const result = [];
  /** @type NodeIdentifier[] */
  let cmp;

  /**
   * @param {NodeIdentifier} v 
   */
  function dfs(v) {
    if (visited[v]) {
      return;
    }
    visited[v] = true;
    cmp.push(v);
    const ss = g.successors(v);
    if (Array.isArray(ss)) {
      ss.forEach(dfs);
    }
    const ps = g.predecessors(v);
    if (Array.isArray(ps)) {
      ps.forEach(dfs);
    }
  }

  g.nodes().forEach((v) => {
    cmp = [];
    dfs(v);
    if (cmp.length) {
      result.push(cmp);
    }
  });

  return result;
}
