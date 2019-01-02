"use strict";

import Shape from "./shape";

class Circle extends Shape {
  constructor(text, x, y, radius) {
    const width = ko.utils.unwrapObservable(radius) * 2;
    super("kd-shape-circle", text, x, y, width, width);

    this.height = this.width;
  }
}

export default Circle;
