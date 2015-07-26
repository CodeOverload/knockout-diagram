"use strict";

class Point {

  constructor(x, y) {
    if (typeof x === "function") {
      this.x = ko.pureComputed(x);
      this.y = ko.pureComputed(y);
    }
    else {
      throw new Error("Unsupported x value");
    }
  }
}

export default Point;
