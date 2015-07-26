"use strict";

import Shape from "./shape";

class Rect extends Shape {
  constructor(text, x, y, width, height) {
    super("kd-shape-rect", text, x, y, width, height);
  }
}

export default Rect;
