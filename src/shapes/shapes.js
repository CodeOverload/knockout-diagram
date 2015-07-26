"use strict";

import Circle from "./circle";
import Diamond from "./diamond";
import Rect from "./rect";

import { parseSvgFragment } from "../utils-svg";
import { iterateDomNodes } from "../utils-dom";

function all() { return [Circle, Diamond, Rect]; }

// Register our own template engine that supports svg. This is similar to the
// native KO one, with the addition of svg support (the svg option
// must be set on the template to enable svg node creation)
function SvgSupportedTemplateEngine() {
  this.allowTemplateRewriting = false;
}

SvgSupportedTemplateEngine.prototype =
  ko.utils.extend(new ko.templateEngine(), { // eslint-disable-line new-cap
    renderTemplateSource: function (templateSource, bindingContext, options, templateDoc) {
      // In some cases the nodes have already created (e.g. if
      // using template: { nodes: someNodes }) so use those instead
      let nodes = templateSource.nodes();
      if (nodes) {
        // Note: this doesn't support IE8 or earlier, as it uses node cloning
        // which isn't supported. See nativeTemplateEngine in KO
        return [...iterateDomNodes(nodes.cloneNode(true).childNodes)];
      } else {
        let templateText = templateSource.text();
        let parseFn = !options.svg ? ko.utils.parseHtmlFragment : parseSvgFragment;
        return parseFn(templateText, templateDoc);
      }
    }
  }
);

ko.setTemplateEngine(new SvgSupportedTemplateEngine());


// Register a binding handler to make it easier to define polygons using
// percentage coords. We can achieve the same using svg scaling /
// a view box, but those approaches also scale the stroke widths etc, which
// isn't what we want
function scalePoints(pointsIn, xfactor, yfactor) {
  let points = pointsIn.split(" ");
  let result = points.map(point => {
    let coords = point.split(",");
    if (coords.length !== 2) {
      throw new Error(`Invalid co-ord: ${point}`);
    }
    let x = parseFloat(coords[0]) * xfactor;
    let y = parseFloat(coords[1]) * yfactor;
    return `${x},${y}`;
  });
  return result.join(" ");
}

ko.bindingHandlers.polygonPoints = {
  update: function(el, valAccessor) {
    let options = ko.unwrap(valAccessor());

    let xfactor = ko.unwrap(options.xfactor);
    let yfactor = ko.unwrap(options.yfactor);
    let pointsIn = ko.unwrap(options.points);

    var pointsOut = scalePoints(pointsIn, xfactor, yfactor);
    jQuery(el).attr("points", pointsOut);
  }
};

export default all;

