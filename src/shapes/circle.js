"use strict";

import Shape from "./shape";

class Circle extends Shape {
  constructor(text, x, y, radius) {
    super("circle-shape", text, x, y, radius * 2, radius * 2);
    this.radius = ko.pureComputed(() => this.width() / 2);
  }
}

export default Circle;


