
function TestShape(templateName) {
  this.templateName = templateName;
  this.x = ko.observable(4);
  this.y = ko.observable(20);
}

describe("Template rendering", function() {

  it("Should handle simple 1-element templates", function() {
  
    function ViewModel() {
      this.shapes = ko.observableArray([
        new TestShape("test-shape-1"),
        new TestShape("test-shape-1"),
      ]);
    }
    
    var vm = new ViewModel();
    var outputDiv = $("#test1");
    ko.applyBindings(vm, outputDiv.get(0));
    
    var circles = outputDiv.find("circle");
    expect(circles.length).to.be.equal(2);
    
    var first = $(circles.get(0));
    expect(first.attr("cx")).to.be.equal("4");
    expect(first.attr("cy")).to.be.equal("20");
    
    // This check is important as it means it's correctly creating SVG elements
    // rather than HTML elements (which is what KO would normally do)
    expect(first.get(0).constructor.name).to.be.equal("SVGCircleElement");
    
    vm.shapes()[0].x(30);
    expect(first.attr("cx")).to.be.equal("30");
    
    var second = $(circles.get(1));
    expect(second.attr("cx")).to.be.equal("4");
    expect(second.attr("cy")).to.be.equal("20");
  });
  
  it("Should handle hierarchical templates", function() {
  
    function ViewModel() {
      this.shapes = ko.observableArray([
        new TestShape("test-shape-2"),
        new TestShape("test-shape-1"),
      ]);
    }
    
    var vm = new ViewModel();
    var outputDiv = $("#test2");
    ko.applyBindings(vm, outputDiv.get(0));
    
    var rects = outputDiv.find("rect");
    expect(rects.length).to.be.equal(1);
    
    // This shape should consist of a rect and an ellipse
    var rect = $(rects.get(0));
    expect(rect.attr("x")).to.be.equal("4");
    expect(rect.attr("y")).to.be.equal("20");
    expect(rect.get(0).constructor.name).to.be.equal("SVGRectElement");
    
    var ellipses = outputDiv.find("ellipse");
    expect(ellipses.length).to.be.equal(1);
    
    var ellipse = $(ellipses.get(0));
    expect(ellipse.attr("cx")).to.be.equal("-16");
    expect(ellipse.attr("cy")).to.be.equal("0");
    expect(ellipse.attr("width")).to.be.equal("60");
    expect(ellipse.get(0).constructor.name).to.be.equal("SVGEllipseElement");
    
    // Check hierarchy
    var rectSiblings = rect.siblings();
    expect(rectSiblings.length).to.be.equal(1);
    
    var rectSibling = $(rectSiblings.get(0));
    expect(rectSibling.prop("tagName")).to.be.equal("g");
    
    var rectSiblingChild = rectSibling.children();
    expect(rectSiblingChild.length).to.be.equal(1);
    expect(rectSiblingChild.prop("tagName")).to.be.equal("ellipse");
    
    // Try an update to the view model to see if it's reflected in the DOM
    vm.shapes()[0].x(100);
    expect(ellipse.attr("cx")).to.be.equal("80");
    expect(rect.attr("x")).to.be.equal("100");
    
    // Check the second shape in the view model has been rendered
    var circle = outputDiv.find("circle");
    expect(circle.length).to.be.equal(1);
  });
});
