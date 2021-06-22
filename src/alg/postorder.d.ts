import { Graph } from "../graph";
import { NodeIdentifier } from "../types";

export default function postOrder(g: Graph, vs: NodeIdentifier|NodeIdentifier[]): NodeIdentifier[];
