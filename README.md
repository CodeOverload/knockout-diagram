# knockout-diagram

knockout-diagram is a client-side library that allows you to create svg diagrams using knockout. It requires knockout and jQuery. 

This project is by no means complete - currently it only supports a small number of primitive shapes. 

## Introduction

Knockout doesn't support svg out of the box because it's essentially a html library. This project replaces the native knockout template engine with a one that also supports svg. For example, you can do: 

```javascipt
    $(document).ready(function() {
      function ViewModel() {
        this.shapes = ko.observableArray([
          new kd.Circle(0, 50, 40),
          new kd.Circle(100, 50, 40),
          new kd.Rect(150, 150, 20, 30)
        ]);
      }
      var vm = new ViewModel();
      ko.applyBindings(vm);
    });
```

```html
    <svg height="300" width="300" class="kd">
      <!-- ko foreach: shapes -->
        <g data-bind="template: { name: templateName, svg: true }" />
      <!-- /ko -->
    </svg>
```

This will render the two circles and the rectangle within the svg element. You can change the positions/parameters of these shapes in the view model, which will be reflected in the DOM. 


## Installation

Clone the repo and build the js module using grunt and babel: 

```sh
git clone https://github.com/CodeOverload/knockout-diagram.git
cd knockout-diagram
grunt build
```

This builds dist/knockout-diagram.js. Currently this will add kd to the global namespace. If this library is useful to anyone else, it might be worth changing it to build amd/commonjs versions. 

## Getting Started

See example/example.html

## Motivation

### Knockout SVG support

To a certain extent, knockout will work for svg - but only when the svg elements are already in the DOM (e.g. when you bind the attributes of an existing svg element in the DOM to a view model). If knockout is creating the svg elements, the elements get added to the DOM but they don't acutally appear. This is because knockout creates the elements as HTMLElement objects, and not SVGElements (e.g. SVGCircleElement). To get around this, I've wrote a new knockout template engine that also supports svg. Essentially this creates SVG elements if the svg: true option is specified in the template reference (see the example above). 

### Application

The ultimate goal is to produce a web-based diagram editor, which this library will play a part. Although this could be achieved using d3/Raphael or similar, those libraries aren't well suited for this kind of application. One of the benefits of knockout is it provides 'automatic' binding such that - for example - if the user wants to move a node on the diagram we can just update the view model for that node, and that will be reflected in the DOM. We don't need to do an explicit enter/update/exit cycle each time an update happens.
