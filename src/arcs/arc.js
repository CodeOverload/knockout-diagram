import * as ko from "knockout";

function calcAngle(point1, point2) {
  const dx = point1.x() - point2.x();
  const dy = point1.y() - point2.y();
  return Math.atan2(dy, dx) * (180 / Math.PI);
}

class Arc {
  constructor(endA, endB) {
    this.endA = endA;
    this.endB = endB;

    // The angle of the arc, measured as the angle from the
    // horizontal line extending eastwards from end B
    const angle = ko.pureComputed(() =>
      calcAngle(this.endA.point(), this.endB.point()));

    this.tRotateEndA = ko.pureComputed(() => `rotate(${angle()})`);
    this.tRotateEndB = ko.pureComputed(() => `rotate(${angle() - 180})`);
  }
}

export default Arc;
