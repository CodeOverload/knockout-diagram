import * as ko from "knockout";

import SvgSupportedTemplateEngine from "./svg-template-engine";
import templates from "./templates";

/**
 * Custom template engine that loads the ko template text from strings rather than
 * the DOM. This is so that we can build the templates into this library, rather
 * than the client having to define the ko templates in their own markup
 * (which in most cases will be the same between different applications)
 */
class StringTemplateEngine extends SvgSupportedTemplateEngine {
  constructor() {
    super();

    // Cache of template sources, keyed by template id
    this.templateSources = {};
  }

  makeTemplateSource(templateId, templateDocument) {
    // We don't have this template, so fall back to the standard ko template logic. It's likely
    // this is a client-defined template
    if (!this.isStringTemplate(templateId)) {
      return super.makeTemplateSource(templateId, templateDocument);
    }

    // See if we've already created and cached a source for this template
    const templateSource = this.templateSources[templateId];
    if (templateSource) {
      return templateSource;
    }

    return this.createTemplateSource(templateId);
  }

  isStringTemplate(templateId) {
    return templates.hasOwnProperty(templateId);
  }

  createTemplateSource(templateId) {
    const source = new StringTemplateSource(templates[templateId]);
    this.templateSources[templateId] = source;
    return source;
  }
}

class StringTemplateSource {
  constructor(templateText) {
    this.templateText = templateText;
    this.storedData = {};
  }

  data(key, value) {
    if (arguments.length === 1) {
        return this.storedData[key];
    }
    this.storedData[key] = value;
  }

  text(value) {
      if (arguments.length === 0) {
        return this.templateText;
      }
      this.templateText = value;
  }
}

ko.setTemplateEngine(new StringTemplateEngine());

