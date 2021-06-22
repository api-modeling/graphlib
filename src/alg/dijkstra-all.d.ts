import { Graph } from "../graph.js";
import { Edge, FloydWarshallItem, NodeIdentifier } from "../types.js";

export default function dijkstraAll(g: Graph, weightFunc?: (edge: Edge) => number, edgeFunc?: (v: NodeIdentifier) => Edge[]): Record<NodeIdentifier, Record<NodeIdentifier, FloydWarshallItem>>;
