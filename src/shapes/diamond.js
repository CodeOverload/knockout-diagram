"use strict";

import Shape from "./shape";

class Diamond extends Shape {
  constructor(text, x, y, width) {
    super("kd-shape-diamond", text, x, y, width, width);
  }
}

export default Diamond;
