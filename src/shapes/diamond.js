"use strict";

import Shape from "./shape";

class Diamond extends Shape {
  constructor(x, y, width) {
    super("diamond-shape", x, y, width, width);
  }
}

export default Diamond;


