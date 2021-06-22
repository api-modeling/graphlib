export declare interface GraphInit {
  /**
   * Set to `true` to get a directed graph and `false` to get an undirected graph. 
   * An undirected graph does not treat the order of nodes in an edge as significant. 
   * In other words, `g.edge("a", "b") === g.edge("b", "a")` for an undirected graph. 
   * 
   * @default true
   */
  directed?: boolean;
  /**
   * Set to true to allow a graph to have multiple edges between the same pair of nodes. 
   * 
   * @default false
   */
  multigraph?: boolean;
  /**
   * Set to true to allow a graph to have compound nodes - nodes which can be the parent of other nodes. 
   * 
   * @default false
   */
  compound?: boolean;
}

export declare interface NodeLabel {
  /**
   * The label of the node.
   */
  label: string;
}

export declare interface Node {
  /**
   * Node identifier
   */
  v: NodeIdentifier;
  value?: Label;
  parent?: NodeIdentifier;
}

export declare interface EdgeBase {
  /**
   * The edges start node
   */
   v: NodeIdentifier;
   /**
    * The edges end node
    */
   w: NodeIdentifier;
   /**
    * The name of the edge.
    */
   name?: string;
}

export declare interface Edge extends EdgeBase {
  /**
   * The label of the edge.
   */
  label?: Label;
}

export declare interface JsonEdge extends EdgeBase {
  /**
   * The label of the edge.
   */
  value?: Label;
}

export type Label = NodeLabel | string | number;
export type NodeIdentifier = string | number;
export type NodeChildren = Record<NodeIdentifier, Record<NodeIdentifier, boolean>>;
export type NodeParents = Record<NodeIdentifier, NodeIdentifier>;
export type CountedEdge = Record<NodeIdentifier, number>;
export type CountedEdges = Record<NodeIdentifier, CountedEdge>;

export declare interface GraphJson {
  options: GraphInit;
  nodes: Node[];
  edges: JsonEdge[];
  value?: string;
}

export declare interface PriorityQueueItem {
  key: string;
  priority: number;
}

export declare interface FloydWarshallItem {
  distance: number;
  predecessor?: NodeIdentifier;
}

export type FloydWarshallResult = Record<NodeIdentifier, Record<NodeIdentifier, FloydWarshallItem>>;
