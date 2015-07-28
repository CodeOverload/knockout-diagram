"use strict";

import { parseSvgFragment } from "../utils-svg";
import { iterateDomNodes } from "../utils-dom";

// Register our own template engine that supports svg. This is similar to the
// native KO one, with the addition of svg support (the svg option
// must be set on the template to enable svg node creation)
class SvgSupportedTemplateEngine extends ko.templateEngine {
  constructor() {
    super();
    this.allowTemplateRewriting = false;
  }

  renderTemplateSource (templateSource, bindingContext, options, templateDoc) {
    // In some cases the nodes have already created (e.g. if
    // using template: { nodes: someNodes }) so use those instead
    let nodes = templateSource.nodes();
    if (nodes) {
      // Note: this doesn't work for IE8 or earlier, as it uses node cloning
      // which isn't supported. See nativeTemplateEngine in KO
      return [...iterateDomNodes(nodes.cloneNode(true).childNodes)];
    }

    let templateText = templateSource.text();
    let parseFn = !options.svg ? ko.utils.parseHtmlFragment : parseSvgFragment;
    return parseFn(templateText, templateDoc);
  }
}

ko.setTemplateEngine(new SvgSupportedTemplateEngine());
