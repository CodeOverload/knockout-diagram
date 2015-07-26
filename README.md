# knockout-diagram

knockout-diagram is a client-side library written using ES6 that allows you to create svg diagrams using knockout. It requires knockout and jQuery. 

This project is by no means complete - currently it only supports a small number of primitive shapes, although it can easily be extended. 

## Introduction

Knockout doesn't support svg out of the box because it's essentially a html library. This project replaces the native knockout template engine with a one that also supports svg. For example, you can do: 

```js
  function ViewModel() {
    this.shapes = ko.observableArray([
      new kd.Circle("Animal", 0, 40, 40),
      new kd.Rect("Dog", 100, 40, 100, 80),
      new kd.Rect("Cat", 70, 140, 80, 80)
    ]);
  }
  ko.applyBindings(new ViewModel());
```

```html
  <svg height="300" width="300" class="kd">
    <!-- ko foreach: shapes -->
      <g data-bind="template: { name: templateName, svg: true }" />
    <!-- /ko -->
  </svg>
```

This will render the two rectangles and a circle, along with their given labels. You can change the positions/parameters of these shapes in the view model, which will be reflected in the DOM. E.g:

```js
  var circle = this.shapes[0];
  circle.moveTo(20, 20);
  
  // Or set the values directly: 
  circle.x(20);
  circle.y(20);
  
  // Alter dimensions: 
  circle.xradius(200);
  
  // Change the label: 
  circle.text("New label");
```

The x, y and xradius members are observables that are bound to the DOM. E.g. the template for a circle is: 

```html
  <script type="text/html" id="kd-shape-circle">
    <g data-bind="attr: { transform: tPosition }">
      <circle data-bind="attr: { cx: xradius, cy: xradius, r: xradius }" />
      <text data-bind="attr: { x: xradius, y: xradius }, text: text" text-anchor="middle" dy="0.3em" />
    </g>
  </script>
```

It's easy to add templates for new shapes or alter the existing ones to suit. 

## Installation

Clone the repo and build the js module using npm, grunt and babel: 

```sh
git clone https://github.com/CodeOverload/knockout-diagram.git
cd knockout-diagram
npm install
```

This builds dist/knockout-diagram.js. Currently this will add kd to the global namespace. If this library is useful to anyone else, it might be worth changing it to build amd/commonjs versions. 

## Getting Started

See example/example.html

## Motivation

### Knockout SVG support

To a certain extent, knockout works for svg - but only when the svg elements are already in the DOM (e.g. when you bind the attributes of an existing svg element in the DOM to a view model). If knockout is creating the svg elements, the elements get added to the DOM but they don't get rendered. This is because knockout creates the elements as HTMLElement objects, and not SVGElements (such as SVGCircleElement). To get around this, I've wrote a new knockout template engine that also supports svg. Essentially this creates SVG elements if the svg: true option is specified in the template reference (see the example above). 

### Application

The ultimate goal is to produce a web-based diagram editor, which this library will play a part. Although this could be achieved using d3/Raphael or similar, those libraries aren't well suited for this kind of application. One of the benefits of knockout is it provides 'automatic' binding such that - for example - if the user wants to move a node on the diagram we can just update the view model for that node, and that will be reflected in the DOM. We don't need to figure out what should be updated and we don't need to do an explicit enter/update/exit cycle each time an update happens.
