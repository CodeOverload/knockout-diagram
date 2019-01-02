"use strict";

import Point from "../point";
import ShapePoint from "./shape-point";
import { wrapObservable } from "../ko/utils-ko";

/**
 * Base class for all shapes
 */
class Shape {

  constructor(templateName, text, x, y, width, height) {
    this.templateName = templateName;

    // Top left point of the shape
    this.x = wrapObservable(x);
    this.y = wrapObservable(y);

    this.width = wrapObservable(width);
    this.height = wrapObservable(height);

    this.text = wrapObservable(text);

    // Distance from the left/top edge to the center
    this.xradius = ko.pureComputed(() => this.width() / 2);
    this.yradius = ko.pureComputed(() => this.height() / 2);

    this.tPosition = ko.pureComputed(() => `translate(${this.x()} ${this.y()})`);

    this.points = this.createPoints();
  }

  createPoints() {
    return [
      new ShapePoint(this, () => this.xradius(), () => 0), // North
      new ShapePoint(this, () => this.width(), () => this.yradius()), // East
      new ShapePoint(this, () => this.xradius(), () => this.height()), // South
      new ShapePoint(this, () => 0, () => this.yradius()) // West
    ];
  }

  moveBy(dx, dy) {
    this.x(this.x() + dx);
    this.y(this.y() + dy);
  }

  moveTo(x, y) {
    this.x(x);
    this.y(y);
  }

  get center() {
    return new Point(this.x() + this.xradius(), this.y() + this.yradius());
  }
}

export default Shape;
