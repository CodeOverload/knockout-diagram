
import shapes from "./shapes/shapes";

(function(kd) {

  // API exports:
  // Attach each shape to the public api
  shapes().forEach(shape => kd[shape.name] = shape.type);
  
})(window.kd = (window.kd || {}));
