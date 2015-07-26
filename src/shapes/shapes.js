"use strict";

import Circle from "./circle";
import Diamond from "./diamond";
import Rect from "./rect";

import { parseSvgFragment } from "../utils-svg";
import { iterateDomNodes } from "../utils-dom";

import "./shape-drag";

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

export default all;

