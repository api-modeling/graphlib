import { Graph } from "../graph";
import { Edge, FloydWarshallResult, NodeIdentifier } from "../types";

export default function floydWarshall(g: Graph, weightFn?: (edge: Edge) => number, edgeFn?: (v: NodeIdentifier) => Edge[]): FloydWarshallResult;
