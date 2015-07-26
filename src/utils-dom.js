"use strict";

/**
 * Generator function to convert a NodeList object into an iterator
 * @param nodeList NodeList instance
 * @param nodeType Optional node type id. If specified, this generator
 * will only return the nodes of the specified type. Otherwise this will
 * return all nodes in the list
 */
function *iterateDomNodes(nodeList, nodeType) {
  for (let i = 0; i < nodeList.length; ++i) {
    if (nodeType !== undefined && nodeList[i].nodeType !== nodeType) {
      continue;
    }
    yield nodeList[i];
  }
}

export { iterateDomNodes };
