import topSort, { CycleException } from "./topsort.js";

/** @typedef {import('../graph').Graph} Graph */

/**
 * @param {Graph} g 
 * @returns {boolean}
 */
export default function isAcyclic(g) {
  try {
    topSort(g);
  } catch (e) {
    if (e instanceof CycleException) {
      return false;
    }
    throw e;
  }
  return true;
}
