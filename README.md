# Graphlib

Graphlib is a JavaScript library that provides data structures for undirected
and directed multi-graphs along with algorithms that can be used with them.

To learn more [see our Wiki](https://github.com/cpettitt/graphlib/wiki).

[![Published on NPM](https://img.shields.io/npm/v/@api-modeling/graphlib.svg)](https://www.npmjs.com/package/@api-modeling/graphlib)

[![Tests and publishing](https://github.com/api-modeling/graphlib/actions/workflows/deployment.yml/badge.svg)](https://github.com/api-modeling/graphlib/actions/workflows/deployment.yml)

## Acknowledgment

This is a port of the [dagrejs/graphlib](https://github.com/dagrejs/graphlib) library that is built for ESM and with types support. This library has no significant changes to the logic of the library.

**MuleSoft nor Salesforce is not association with the original authors of the library and does not provide support for it.**

## Usage

### Installation

```sh
npm install --save @api-modeling/graphlib
```

### Creating a graph

```javascript
import { Graph } from '@api-modeling/graphlib';

const g = new Graph();
g.setGraph("graph label");
g.setNode("a", 123);
g.setPath(["a", "b", "c"]);
g.setEdge("a", "c", 456);
```

## License

Graphlib is licensed under the terms of the MIT License. See the
[LICENSE](LICENSE) file for details.

[npm package manager]: http://npmjs.org/
