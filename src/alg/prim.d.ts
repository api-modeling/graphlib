import { Graph } from "../graph";
import { Edge } from "../types";

export default function prim(g: Graph, weightFunc: (edge: Edge) => number): Graph;
