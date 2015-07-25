"use strict";

class Point {

  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  get x() { return this._x; }
  get y() { return this._y; }

  subtract(point) {
    return new Point(this.x - point.x, this.y - point.y);
  }

  /**
   * Constructs a new Point instance based on the position of the mouse
   * (can be used only for mouse events)
   * @param event jquery event object
   */
  static fromEvent(event) {
    return new Point(event.pageX, event.pageY);
  }
}

export default Point;
