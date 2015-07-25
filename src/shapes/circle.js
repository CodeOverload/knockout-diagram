
import Shape from "./shape"

class Circle extends Shape {
  constructor(cx, cy, radius) {
    super("circle-shape", cx - radius, cy - radius, radius * 2, radius * 2);
    this.cx = ko.pureComputed(() => this.x() + this.radius());
    this.cy = ko.pureComputed(() => this.y() + this.radius());
    this.radius = ko.pureComputed(() => this.width() / 2);
  }
}

export default Circle;


