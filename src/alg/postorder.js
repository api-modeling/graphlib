import dfs from "./dfs.js";

/** @typedef {import('../graph').Graph} Graph */
/** @typedef {import('../types').NodeIdentifier} NodeIdentifier */

/**
 * @param {Graph} g 
 * @param {NodeIdentifier|NodeIdentifier[]} vs 
 * @returns {NodeIdentifier[]}
 */
export default function postOrder(g, vs) {
  return dfs(g, vs, "post");
}
