"use strict";

import { iterateDomNodes } from "./utils-dom";

function convertSvgNode(node, templateDoc) {
  let el = templateDoc.createElementNS("http://www.w3.org/2000/svg", node.nodeName);

  for (let attr of iterateDomNodes(node.attributes)) {
    el.setAttribute(attr.nodeName, attr.value);
  }

  for (let child of iterateDomNodes(node.childNodes, 1)) {
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
  return [...iterateDomNodes(root.childNodes)];
}

export { parseSvgFragment };
