
import Shape from "./shape"

class Rect extends Shape {
  constructor(x, y, width, height) {
    super("rect-shape", x, y, width, height);
  }
}

export default Rect;
