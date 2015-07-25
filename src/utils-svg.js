"use strict";

function convertSvgNode(node, templateDoc) {
  let el = templateDoc.createElementNS("http://www.w3.org/2000/svg", node.nodeName);

  for (let i = 0; i < node.attributes.length; ++i) {
    let attr = node.attributes[i];
    el.setAttribute(attr.nodeName, attr.value);
  }

  let children = node.childNodes;
  for (let i = 0; i < children.length; ++i) {
    let child = children[i];
    if (child.nodeType !== 1)
    {
      continue;
    }
    let childEl = convertSvgNode(child, templateDoc);
    el.appendChild(childEl);
  }

  return el;
}

function parseSvgFragment(templateText, templateDoc) {
  // We need a single root node for it to be valid xml
  templateText = "<g>" + templateText + "</g>";
  let doc = jQuery.parseXML(templateText);
  let el = convertSvgNode(doc.documentElement, templateDoc);
  return [el];
}

export { parseSvgFragment };
