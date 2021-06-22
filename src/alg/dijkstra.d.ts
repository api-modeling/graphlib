import { Graph } from "../graph";
import { Edge, FloydWarshallItem, NodeIdentifier } from "../types";

export default function dijkstra(g: Graph, source: NodeIdentifier, weightFn?: ((edge: Edge) => number), edgeFn?: ((v: NodeIdentifier) => Edge[])): Record<NodeIdentifier, FloydWarshallItem>;
