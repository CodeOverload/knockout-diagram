"use strict";

function calcAngle(point1, point2) {
  let dx = point1.x() - point2.x();
  let dy = point1.y() - point2.y();
  let angle = Math.atan(dy / dx) * (180 / Math.PI);
  return dx < 0 ? angle - 180 : angle;
}

class Arc {
  constructor(endA, endB) {
    this.endA = endA;
    this.endB = endB;

    // The angle of the arc, measured as the angle from the
    // vertical line extending downwards from end A
    let angle = ko.pureComputed(() =>
      calcAngle(this.endA.point(), this.endB.point()));

    this.tRotateEndA = ko.pureComputed(() => `rotate(${angle()})`);
    this.tRotateEndB = ko.pureComputed(() => `rotate(${angle() - 180})`);
  }
}

export default Arc;
