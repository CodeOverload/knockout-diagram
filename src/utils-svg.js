"use strict";

function *domNodes(nodeList, nodeType) {
  for (let i = 0; i < nodeList.length; ++i) {
    if (nodeType !== undefined && nodeList[i].nodeType !== nodeType) {
      continue;
    }
    yield nodeList[i];
  }
}

function convertSvgNode(node, templateDoc) {
  let el = templateDoc.createElementNS("http://www.w3.org/2000/svg", node.nodeName);

  for (let attr of domNodes(node.attributes)) {
    el.setAttribute(attr.nodeName, attr.value);
  }

  for (let child of domNodes(node.childNodes, 1)) {
    let childEl = convertSvgNode(child, templateDoc);
    el.appendChild(childEl);
  }

  return el;
}

function parseSvgFragment(templateText, templateDoc) {
  // We need a single root node for it to be valid xml
  templateText = "<g>" + templateText + "</g>";
  let doc = jQuery.parseXML(templateText);
  let root = convertSvgNode(doc.documentElement, templateDoc);
  return [...domNodes(root.childNodes)];
}

export { parseSvgFragment };
