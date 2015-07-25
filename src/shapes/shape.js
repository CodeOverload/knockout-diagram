"use strict";

/**
 * Base class for all shapes
 */
class Shape {

  constructor(templateName, x, y, width, height) {
    this.templateName = templateName;
    this.x = ko.observable(x);
    this.y = ko.observable(y);
    this.width = ko.observable(width);
    this.height = ko.observable(height);
  }

  moveBy(dx, dy) {
    this.x(this.x() + dx);
    this.y(this.y() + dy);
  }

  moveTo(x, y) {
    this.x(x);
    this.y(y);
  }
}

export default Shape;
