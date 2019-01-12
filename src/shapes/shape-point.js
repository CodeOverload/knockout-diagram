import * as ko from "knockout";

class ShapePoint {

  constructor(shape, x, y) {
    if (typeof x === "function") {
      this.x = ko.pureComputed(() => x() + shape.x());
      this.y = ko.pureComputed(() => y() + shape.y());
    }
    else {
      throw new Error("Unsupported x value");
    }
    this.shape = shape;
  }
}

export default ShapePoint;
