import { Graph } from "../graph";
import { NodeIdentifier } from "../types";

export class CycleException extends Error {}

export default function topSort(g: Graph): NodeIdentifier[];
