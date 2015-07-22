
/**
 * Base class for all shapes
 */
class Shape {
  
  constructor(type, x, y, width, height) {
    this.type = type;
    this.x = ko.observable(x);
    this.y = ko.observable(y);
    this.width = ko.observable(width); 
    this.height = ko.observable(height);
  }
  
  move(dx, dy) {
    this.x(this.x() + dx);
    this.y(this.y() + dy);
  }
}

export default Shape
