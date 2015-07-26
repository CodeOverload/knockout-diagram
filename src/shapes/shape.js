"use strict";

/**
 * Base class for all shapes
 */
class Shape {

  constructor(templateName, text, x, y, width, height) {
    this.templateName = templateName;
    this.x = ko.observable(x);
    this.y = ko.observable(y);
    this.width = ko.observable(width);
    this.height = ko.observable(height);
    this.text = ko.observable(text);

    this.cx = ko.pureComputed(() => this.x() + this.width() / 2);
    this.cy = ko.pureComputed(() => this.y() + this.height() / 2);
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
