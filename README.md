# knockout-diagram

An es6 client-side library for creating svg diagrams using knockout. It requires knockout and jQuery (these aren't bundled).

Currently it only supports a small number of primitive shapes, but it can easily be extended.

## Introduction

Simple example:

```js
  function ViewModel() {
    this.shapes = ko.observableArray([
      new kodiagram.Circle("Animal", 0, 40, 40),
      new kodiagram.Rect("Dog", 100, 40, 100, 80),
      new kodiagram.Rect("Cat", 70, 140, 80, 80)
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

This will render two rectangles and a circle, along with their given labels. You can change the positions/parameters of these shapes in the view model, and these changes will automatically be reflected in the DOM:

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

The shape templates are now defined within the library, so there's no need to define these in your project markup.

Note that knockout doesn't support svg out of the box because it's a html library. This project replaces the native knockout template engine with a one that also supports svg.

## Installation

Clone the repo and build the js module using npm, grunt and babel:

```sh
git clone https://github.com/CodeOverload/kodiagram.git
cd kodiagram
npm install
npm run build
```

This builds dist/kodiagram.esm.js and dist/kodiagram.umd.js

## Getting Started

See example/example.html

### Knockout SVG support

To a certain extent, knockout works for svg - but only when the svg elements are already in the DOM (e.g. when you bind the attributes of an existing svg element in the DOM to a view model). If knockout is creating the svg elements, the elements get added to the DOM but they don't get rendered. This is because knockout creates the elements as HTMLElement objects, and not SVGElements (such as SVGCircleElement). To get around this, I've wrote a new knockout template engine that also supports svg. Essentially this creates SVG elements if the svg: true option is specified in the template reference (see the example above).
