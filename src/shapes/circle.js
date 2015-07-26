"use strict";

import Shape from "./shape";

class Circle extends Shape {
  constructor(text, x, y, radius) {
    super("kd-shape-circle", text, x, y, radius * 2, radius * 2);
  }
}

export default Circle;
