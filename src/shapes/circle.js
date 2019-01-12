import * as ko from "knockout";

import Shape from "./shape";
import ShapePoint from "./shape-point";

const NUM_POINTS = 16;
const ANGLE_BETWEEN_POINTS = Math.PI / (NUM_POINTS / 2);

class Circle extends Shape {
  constructor(text, x, y, radius) {
    const width = ko.utils.unwrapObservable(radius) * 2;
    super(true, "kd-shape-circle", text, x, y, width, null);
  }

  createPoints() {
    return Array.from(new Array(NUM_POINTS).keys()).map(i => {
      const angle = ANGLE_BETWEEN_POINTS * i;
      return new ShapePoint(this, () => this.xradius() * Math.cos(angle) + this.xradius(),
        () => this.xradius() * Math.sin(angle) + this.xradius());
    });
  }
}

export default Circle;
