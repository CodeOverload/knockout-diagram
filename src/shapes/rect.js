
import Shape from "./shape"

const COMPONENT_NAME = "shape-rect";
const ELEMENT_NAME = "rect";

class Rect extends Shape {

  constructor(x, y, width, height) {
    super(COMPONENT_NAME, x, y, width, height);
  }
}

class RectInfo {
  get name() { return "Rect"; }
  get componentName() { return COMPONENT_NAME; }
  get elementName() { return ELEMENT_NAME; }
  get dataBindAttr() { return "attr: {x: x, y: y, width: width, height: height}"; }
  get type() { return Rect; }
} 

export const info = new RectInfo();

export default Rect;


