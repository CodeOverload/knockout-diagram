"use strict";

import Circle from "./circle";
import Rect from "./rect";

import { parseSvgFragment } from "../utils-svg";

import "./shape-drag";

function all() { return [Circle, Rect]; }

// Register our own template engine that supports svg. This is similar to the
// native KO one, with the addition of svg support (the svg option
// must be set on the template to enable svg node creation). Note that this
// doesn't support IE8 or earlier, as it unconditionally uses node cloning
// which isn't supported. See the KO native one for what changes are needed
function SvgSupportedTemplateEngine() {
  this.allowTemplateRewriting = false;
}

SvgSupportedTemplateEngine.prototype =
  ko.utils.extend(new ko.templateEngine(), { // eslint-disable-line new-cap
    renderTemplateSource: function (templateSource, bindingContext, options, templateDoc) {
      let cachedResult = templateSource.nodes();
      if (cachedResult) {
        return makeArray(cachedResult.cloneNode(true).childNodes);
      } else {
        let templateText = templateSource.text();
        let parseFn = !options.svg ? ko.utils.parseHtmlFragment : parseSvgFragment;
        return parseFn(templateText, templateDoc);
      }
    }
  }
);

function makeArray(arr) {
  var result = [];
  for (let i = 0, len = arr.length; i < len; ++i) {
    result.push(arr[i]);
  }
  return result;
}

ko.setTemplateEngine(new SvgSupportedTemplateEngine());

export default all;

