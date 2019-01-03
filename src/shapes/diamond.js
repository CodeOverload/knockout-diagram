"use strict";

import Shape from "./shape";

class Diamond extends Shape {
  constructor(text, x, y, width, height) {
    super(false, "kd-shape-diamond", text, x, y, width, height);
  }
}

export default Diamond;
