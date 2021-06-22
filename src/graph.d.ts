import { CountedEdges, Edge, GraphInit, Label, NodeChildren, NodeIdentifier, NodeParents } from "./types";

export declare class Graph {
  _isDirected: boolean;
  _isMultigraph: boolean;
  _isCompound: boolean;
  _label: string;
  /**
   * v -> label
   */
  _nodes: Record<NodeIdentifier, Label>;
  _parent: NodeParents;

  /** v -> children */
  _children: NodeChildren;
  /**
     * v -> edgeObj
     */
  _in: Record<NodeIdentifier, Record<NodeIdentifier, Edge>>;

  /**
   * u -> v -> Number
   */
  _predecessors: CountedEdges;
  /**
   * v -> edgeObj
   * @type {}
   */
  _out: Record<NodeIdentifier, Record<NodeIdentifier, Edge>>;

  /**
   * u -> w -> Number
   */
  _successors: CountedEdges;

  /**
   * e -> edgeObj
   */
  _edgeObjects: Record<NodeIdentifier, Edge>;

  /**
   * e -> label
   */
  _edgeLabels: Record<NodeIdentifier, Label>;

  /* Number of nodes in the graph. Should only be changed by the implementation. */
  _nodeCount: number;

  /* Number of edges in the graph. Should only be changed by the implementation. */
  _edgeCount: number;

  /**
   * @param opts Graph init options
   */
  constructor(opts?: GraphInit);

  /**
   * A directed graph treats the order of nodes in an edge as significant whereas an undirected graph does not. 
   * 
   * This example demonstrates the difference:
   * 
   * ```javascript
   * var directed = new Graph({ directed: true });
   * directed.setEdge("a", "b", "my-label");
   * directed.edge("a", "b"); // returns "my-label"
   * directed.edge("b", "a"); // returns undefined
   * 
   * var undirected = new Graph({ directed: false });
   * undirected.setEdge("a", "b", "my-label");
   * undirected.edge("a", "b"); // returns "my-label"
   * undirected.edge("b", "a"); // returns "my-label"
   * ```
   * 
   * @returns {boolean} `true` if the graph is directed.
   */
  isDirected(): boolean;

  /**
   * @returns {boolean} `true` if the graph is a [multigraph](https://github.com/dagrejs/graphlib/wiki/API-Reference#multigraphs).
   */
  isMultigraph(): boolean;

  /**
   * @returns {boolean} `true` if the graph is [compound](https://github.com/dagrejs/graphlib/wiki/API-Reference#compound-graphs).
   */
  isCompound(): boolean;

  /**
   * Sets the label for the graph to `label`.
   */
  setGraph(label: string): Graph;

  /**
   * @returns The currently assigned label for the graph. If no label has been assigned, returns undefined
   */
  graph(): string|undefined;

  /**
   * Defaults to be set when creating a new node
   */
  _defaultNodeLabelFn(node?: NodeIdentifier): string|undefined;

  /**
   * Defaults to be set when creating a new edge
   */
  _defaultEdgeLabelFn(v: NodeIdentifier, w: NodeIdentifier, name?: string): string|undefined;

  /**
   * Sets a new default value that is assigned to nodes that are created without a label. 
   * If the value is not a function it is assigned as the label directly. 
   * If the value is a function, it is called with the id of the node being created.
   */
  setDefaultNodeLabel(newDefault: string|(() => string)): Graph;

  /**
   * @returns the number of nodes in the graph.
   */
  nodeCount(): number;
  /**
   * @returns the ids of the nodes in the graph. Use node(v) to get the label for each node. Takes O(|V|) time.
   */
  nodes(): NodeIdentifier[];

  /**
   * @returns those nodes in the graph that have no in-edges. Takes O(|V|) time.
   */
  sources(): NodeIdentifier[];

  /**
   * @returns those nodes in the graph that have no out-edges. Takes O(|V|) time.
   */
  sinks(): NodeIdentifier[];

  /**
   * Shortcut to calling `setNode()` on each array element
   */
  setNodes(vs: NodeIdentifier[], value?: Label): Graph;

  /**
   * Creates or updates the value for the node v in the graph. 
   * If `label` is supplied it is set as the value for the node. 
   * If `label` is not supplied and the node was created by this call then the default node label 
   * is assigned. 
   * 
   * @param v The node to set
   * @returns the graph, allowing this to be chained with other functions. Takes O(1) time.
   */
  setNode(v: NodeIdentifier, label?: Label): Graph;

  /**
   * @returns the label assigned to the node or undefined when not found. Takes O(1) time.
   */
  node(v: NodeIdentifier): Label|undefined;

  /**
   * @returns `true` when the graph has a node. Takes O(1) time.
   */
  hasNode(v: NodeIdentifier): boolean;

  /**
   * Removes the node with the id v in the graph or does nothing if the node is not in the graph. 
   * If the node was removed this function also removes any incident edges.
   * 
   * @returns the graph, allowing this to be chained with other functions. Takes O(|E|) time.
   */
  removeNode(v: NodeIdentifier): Graph;

  /**
   * Sets the parent for `v` to `parent` if it is defined or removes the parent for `v` if `parent` is undefined. 
   * Throws an error if the graph is not compound.
   * @param v The node on which to set/remove parent
   * @param parent The parent to set. Removes the parent when not set.
   * @returns the graph, allowing this to be chained with other functions. Takes O(1) time.
   */
  setParent(v: NodeIdentifier, parent?: NodeIdentifier): Graph;

  _removeFromParentsChildList(v: NodeIdentifier): void;

  /**
   * @returns the node that is a parent of node `v` or undefined if node `v` does not have a parent or is not a member of the graph. 
   * Always returns `undefined` for graphs that are not compound. Takes O(1) time.
   */
  parent(v: NodeIdentifier): NodeIdentifier|undefined;

  /**
   * @returns all nodes that are children of node v or undefined if node v is not in the graph. Always returns [] for graphs that are not compound. Takes O(|V|) time.
   */
  children(v?: NodeIdentifier): NodeIdentifier[]|undefined;

  /**
   * @returns all nodes that are predecessors of the specified node or `undefined` if node `v` is not in the graph. 
   * Behavior is `undefined` for undirected graphs - use `neighbors()` instead. Takes O(|V|) time.
   */
  predecessors(v: NodeIdentifier): NodeIdentifier[]|undefined;

  /**
   * @returns all nodes that are successors of the specified node or `undefined` if node `v` is not in the graph. 
   * Behavior is `undefined` for undirected graphs - use `neighbors()` instead. Takes O(|V|) time.
   */
  successors(v: NodeIdentifier): NodeIdentifier[]|undefined;

  /**
   * @returns all nodes that are predecessors or successors of the specified node or `undefined` if node v is not in the graph. 
   * Takes O(|V|) time.
   */
  neighbors(v: NodeIdentifier): NodeIdentifier[];

  isLeaf(v?: NodeIdentifier): boolean;

  /**
   * @param filter The filter function.
   */
  filterNodes(filter: (id: NodeIdentifier) => boolean): Graph;

  /**
   * Sets a new default value that is assigned to edges that are created without a label. 
   * If the value is not a function it is assigned as the label directly. 
   * If the value is a function, it is called with the parameters (v, w, name).
   */
  setDefaultEdgeLabel(newDefault: string|((v:NodeIdentifier, w:NodeIdentifier, name?: string) => string)): Graph;

  /**
   * @returns the number of edges in the graph.
   */
  edgeCount(): number;

  /**
   * @returns the edge object for each edge in the graph. Use edge(edgeObj) to get the label for each edge. Takes O(|E|) time.
   */
  edges(): Edge[];

  setPath(vs: NodeIdentifier[], value?: string): Graph;

  /**
   * Creates or updates the label for the edge (v, w) with the optionally supplied name. 
   * If `label` is supplied it is set as the value for the edge. If `label` is not supplied and the edge 
   * is created by this call then the default edge label will be assigned. 
   * The name parameter is only useful with multi graphs.
   * setEdge(v, w, [value, [name]])
   * setEdge({ v, w, [name] }, [value])
   * 
   * Takes O(1) time.
   * 
   * @param v
   * @param w Required when the `v` is not an Edge. When the `v` is Edge then this is the same as `value`.
   * @param value
   * @param name
   * @returns Returns the graph, allowing this to be chained with other functions. 
   */
  setEdge(v: NodeIdentifier|Edge, w?: NodeIdentifier|Label, value?: number|string, name?: string): Graph;

  /**
   * The name parameter is only useful with multi graphs. `v` and `w` can be interchanged for undirected graphs. 
   * 
   * Takes O(1) time.
   * 
   * @param v 
   * @param w Required when `v` is not an edge. When the `v` is an object then this is `name` param.
   * @param name 
   * @returns the label for the edge (v, w) if the graph has an edge between `v` and `w` with the optional name.
   * Returns `undefined` if there is no such edge in the graph. 
   */
  edge(v: Edge|NodeIdentifier, w?: NodeIdentifier|string, name?: string): Label|undefined;

  /**
   * The name parameter is only useful with [multi graphs](https://github.com/dagrejs/graphlib/wiki/API-Reference#multigraphs). 
   * `v` and `w` can be interchanged for undirected graphs. 
   * 
   * Takes O(1) time.
   * 
   * @param v 
   * @param w Required when `v` is not an edge. When the `v` is an object then this is `name` param.
   * @param name 
   * @returns `true` if the graph has an edge between `v` and `w` with the optional name. 
   */
  hasEdge(v: Edge|NodeIdentifier, w?: NodeIdentifier|string, name?: string): boolean;

  /**
   * Removes the edge (v, w) if the graph has an edge between `v` and `w` with the optional name. 
   * If not this function does nothing. The `name` parameter is only useful with multi graphs. 
   * `v` and `w` can be interchanged for undirected graphs. 
   * 
   * Takes O(1) time.
   * 
   * @param v 
   * @param w Required when `v` is not an edge. When the `v` is an object then this is `name` param.
   * @param name 
   */
  removeEdge(v: Edge|NodeIdentifier, w?: NodeIdentifier|string, name?: string): Graph;

  /**
   * Returns all edges that point to the node `v`. 
   * Optionally filters those edges down to just those coming from node `u`. 
   * Behavior is undefined for undirected graphs - use `nodeEdges()` instead.
   * 
   * Takes O(|E|) time.
   * 
   * @returns {Edge[]|undefined} all edges that point to the node `v`. Returns undefined if node v is not in the graph.
   */
  inEdges(v: NodeIdentifier, u?: NodeIdentifier): Edge[]|undefined;

  /**
   * Return all edges that are pointed at by node `v`.
   * Optionally filters those edges down to just those point to `w`.
   * Behavior is undefined for undirected graphs - use `nodeEdges()` instead.
   * 
   * Takes O(|E|) time.
   * 
   * @returns all edges that are pointed at by node `v`. Returns undefined if node v is not in the graph.
   */
  outEdges(v: NodeIdentifier, w?: NodeIdentifier): Edge[]|undefined;

  /**
   * Returns all edges to or from node `v` regardless of direction. 
   * Optionally filters those edges down to just those between nodes `v` and `w` regardless of direction. 
   * 
   * Takes O(|E|) time.
   * 
   * @returns {} Returns undefined if node v is not in the graph.
   */
  nodeEdges(v: NodeIdentifier, w?: NodeIdentifier): Edge[]|undefined;
}
