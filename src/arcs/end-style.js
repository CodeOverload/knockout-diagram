/**
 * Represents the style of an endpoint. Most endpoints
 * will be rendered entirely using templates, so this class
 * will be sufficient in most cases. It can subclassed if
 * specific behaviour is needed though
 */
class EndStyle {
  constructor(templateName) {
    this.templateName = templateName;
  }
}

export default EndStyle;
