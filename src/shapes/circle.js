
import Shape from "./shape"

const COMPONENT_NAME = "shape-circle";
const ELEMENT_NAME = "circle";

class Circle extends Shape {

  constructor(cx, cy, radius) {
    super(COMPONENT_NAME, cx - radius, cy - radius, radius * 2, radius * 2);
    this.cx = ko.pureComputed(() => this.x() + this.radius());
    this.cy = ko.pureComputed(() => this.y() + this.radius());
    this.radius = ko.pureComputed(() => this.width() / 2);
  }
}

class CircleInfo {
  get name() { return "Circle"; }
  get componentName() { return COMPONENT_NAME; }
  get elementName() { return ELEMENT_NAME; }
  get dataBindAttr() { return "attr: {cx: cx, cy: cy, r: radius}"; }
  get type() { return Circle; }
} 

export const info = new CircleInfo();

export default Circle;


