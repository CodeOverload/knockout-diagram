"use strict";

function snapCoordinate(c, size) {
  return Math.round(c / size) * size;
}

/**
 * Immutable point class, used for calculations. This should be kept free
 * of any knockout observables
 */
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

  add(point) {
    return new Point(this.x + point.x, this.y + point.y);
  }

  snap(size) {
    return new Point(snapCoordinate(this.x, size), snapCoordinate(this.y, size));
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
