"use strict";

import Point from "../point";

class ShapePoint extends Point {

  constructor(shape, x, y) {
    super(() => x() + shape.x(), () => y() + shape.y());
    this.shape = shape;
  }
}

export default ShapePoint;
