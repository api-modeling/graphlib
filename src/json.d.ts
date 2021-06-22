import { Graph } from './graph';
import { GraphJson } from './types';

export declare function write(g: Graph): GraphJson;
export declare function read(json: GraphJson): Graph;
