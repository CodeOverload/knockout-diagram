"use strict";

import Shape from "./shape";

class Diamond extends Shape {
  constructor(text, x, y, width) {
    super("diamond-shape", text, x, y, width, width);

    this.rotateTransform = ko.pureComputed(() => `rotate(45 ${this.cx()} ${this.cy()})`);
  }
}

export default Diamond;


