
import { info as circleInfo } from "./circle"
import { info as rectInfo } from "./rect"

import "./shape-drag"


function all() { return [circleInfo, rectInfo]; }


// Mapping of component name to ShapeInfo
const components = all().reduce((map, shape) => {
    map[shape.componentName] = shape;
    return map;
  }, {});


// Register a ko component for each shape type, that binds to the view model
// of the original element in the DOM. 
// The component itself doesn't do much work - the custom component loader we 
// define below does most of the leg work in terms of creating the DOM 
// elements for each shape. Unfortunately there's no way to return an element 
// object in the template for a component, which is why we have to define a 
// custom component loader
all().forEach(shape => {

    ko.components.register(shape.componentName, {
    viewModel: {
      // Get the element that was bound as a component, and look up the vm for that
      createViewModel: (p, componentInfo) => ko.dataFor(componentInfo.element)
    },
    // We use a custom component loader which doesn't use the template
    template: "not used"
  });
});

ko.components.loaders.unshift({
  loadTemplate: function(name, config, callback) {
    var shapeInfo = components[name];
    // This isn't one of our shape components
    if (!shapeInfo) 
    { 
      // Defer to the next component loader in the chain
      return callback(null);
    }
    
    // Otherwise, create a new SVGElement object for the shape, 
    // with the appropriate data-bind attribute
    let el = document.createElementNS("http://www.w3.org/2000/svg", shapeInfo.elementName);
    el.setAttribute("data-bind", shapeInfo.dataBindAttr + ", shapeDrag: true");
    el.setAttribute("class", "kd");
    return callback([el]);
  }
});

export default all

