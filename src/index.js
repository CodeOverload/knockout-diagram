"use strict";

import shapes from "./shapes/shapes";

import Point from "./point";

import Arc from "./arcs/arc";
import End from "./arcs/end";

import endStyles from "./arcs/end-styles";

import "./ko/svg-engine";
import "./ko/polygon-points";

(function(kd) {

  // API exports:
  // Attach each shape to the public api
  shapes().forEach(shape => kd[shape.name] = shape);

  kd.Point = Point;

  kd.Arc = Arc;
  kd.End = End;
  kd.endStyles = endStyles();

})(window.kd = (window.kd || {}));
