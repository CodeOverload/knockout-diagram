"use strict";

import Point from "../point";
import ShapePoint from "./shape-point";
import { wrapObservable } from "../ko/utils-ko";

/**
 * Base class for all shapes
 */
class Shape {

  constructor(equilateral, templateName, text, x, y, width, height) {
    this.equilateral = equilateral;
    this.templateName = templateName;

    // Top left point of the shape
    this.x = wrapObservable(x);
    this.y = wrapObservable(y);

    this.width = wrapObservable(width);
    this.height = equilateral ? this.width : wrapObservable(height);

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

  get center() {
    return new Point(this.x() + this.xradius(), this.y() + this.yradius());
  }

  moveBy(dx, dy) {
    this.x(this.x() + dx);
    this.y(this.y() + dy);
  }

  moveTo(x, y) {
    this.x(x);
    this.y(y);
  }

  widenFromCenter(delta) {
    this.resizeFromCenter(this.x, this.width, delta, this.y);
  }

  heightenFromCenter(delta) {
    this.resizeFromCenter(this.y, this.height, delta, this.x);
  }

  resizeFromCenter(dimension, length, delta, otherDimension) {
    dimension(dimension() - delta);
    length(length() + delta * 2);

    if (!this.equilateral) return;

    otherDimension(otherDimension() - delta);
  }
}

export default Shape;
