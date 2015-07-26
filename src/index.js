"use strict";

import shapes from "./shapes/shapes";
import Arc from "./arc";

(function(kd) {

  // API exports:
  // Attach each shape to the public api
  shapes().forEach(shape => kd[shape.name] = shape);

  kd.Arc = Arc;

})(window.kd = (window.kd || {}));
