import { Graph } from './graph';
import { GraphJson } from './types';

/**
 * Creates a JSON representation of the graph that can be serialized to a string with
 * JSON.stringify. The graph can later be restored using json.read.
 * 
 * @argument graph target to create JSON representation of.
 * @returns JSON serializable graph representation
 */
export declare function write<G, N, E>(g: Graph<G, N, E>): GraphJson<G, N, E>;

/**
 * Takes JSON as input and returns the graph representation.
 *
 * @example
 * var g2 = graphlib.json.read(JSON.parse(str));
 * g2.nodes();
 * // ['a', 'b']
 * g2.edges()
 * // [ { v: 'a', w: 'b' } ]
 * 
 * @argument json - JSON serializable graph representation
 * @returns graph constructed according to specified representation
 */
export declare function read<G, N, E>(json: GraphJson<G, N, E>): Graph<G, N, E>;
