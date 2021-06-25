import { Graph } from "../graph";
import { NodeIdentifier } from "../types";

/**
 * Finds all connected components in a graph and returns an array of these components.
 * Each component is itself an array that contains the ids of nodes in the component.
 * Complexity: O(|V|).
 * 
 * @argument graph - graph to find components in.
 * @returns array of nodes list representing components
 */
export default function components<N, E>(g: Graph<N, E>): NodeIdentifier[][];
