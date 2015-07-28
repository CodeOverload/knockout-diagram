"use strict";

// Register a binding handler to make it easier to define polygons using
// percentage coords. We can achieve the same using svg scaling /
// a view box, but those approaches also scale the stroke widths etc, which
// isn't what we want
function scalePoints(pointsIn, xfactor, yfactor) {
  let points = pointsIn.split(" ");
  let result = points.map(point => {
    let coords = point.split(",");
    if (coords.length !== 2) {
      throw new Error(`Invalid co-ordinate: ${point}`);
    }
    let x = parseFloat(coords[0]) * xfactor;
    let y = parseFloat(coords[1]) * yfactor;
    return `${x},${y}`;
  });
  return result.join(" ");
}

ko.bindingHandlers.polygonPoints = {
  update: function(el, valAccessor) {
    let options = ko.unwrap(valAccessor());

    let xfactor = ko.unwrap(options.xfactor);
    let yfactor = ko.unwrap(options.yfactor);
    let pointsIn = ko.unwrap(options.points);

    var pointsOut = scalePoints(pointsIn, xfactor, yfactor);
    jQuery(el).attr("points", pointsOut);
  }
};
