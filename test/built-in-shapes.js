
describe("Built-in shapes", function() {

  it("Circle", function() {

    function ViewModel() {
      this.shapes = ko.observableArray([
        new kd.Circle("A label", 40, 50, 30)
      ]);
    }

    var vm = new ViewModel();
    var outputDiv = $("#builtInShapesOutputCircle");
    ko.applyBindings(vm, outputDiv.get(0));

    var circles = outputDiv.find("circle");
    expect(circles.length).to.be.equal(1);

    var first = $(circles.get(0));
    expect(first.attr("cx")).to.be.equal("30");
    expect(first.attr("cy")).to.be.equal("30");
    expect(first.attr("r")).to.be.equal("30");
    expect(first.get(0).constructor.name).to.be.equal("SVGCircleElement");

    var parent = first.parent();
    expect(parent.attr("transform")).to.be.equal("translate(40 50)");
    expect(parent.get(0).constructor.name).to.be.equal("SVGGElement");

    var text = parent.find("text");
    expect(text.length).to.be.equal(1);
    expect(text.text()).to.be.equal("A label");
    expect(text.get(0).constructor.name).to.be.equal("SVGTextElement");

    vm.shapes()[0].moveTo(20, 10);
    expect(parent.attr("transform")).to.be.equal("translate(20 10)");
  });

  it("Circle supports observables", function() {

    function ViewModel() {
      var x = ko.observable(40);
      var y = ko.observable(50);
      var r = ko.pureComputed(() => 30);
      this.shapes = ko.observableArray([
        new kd.Circle("A label", x, y, r)
      ]);
    }

    var vm = new ViewModel();
    var outputDiv = $("#builtInShapesOutputCircleSupportsObservables");
    ko.applyBindings(vm, outputDiv.get(0));

    var circles = outputDiv.find("circle");
    expect(circles.length).to.be.equal(1);

    var first = $(circles.get(0));
    expect(first.attr("cx")).to.be.equal("30");
    expect(first.attr("cy")).to.be.equal("30");
    expect(first.attr("r")).to.be.equal("30");

    var parent = first.parent();
    expect(parent.attr("transform")).to.be.equal("translate(40 50)");

    var text = parent.find("text");
    expect(text.text()).to.be.equal("A label");
  });

  it("Circle points are positioned correctly", function() {
    var circle = new kd.Circle("A label", 10, 30, 20);

    var points = circle.points;

    // Only spot-check 4 of the points
    var east = points[0];
    expect(east.x()).to.be.closeTo(50, 0.0000001);
    expect(east.y()).to.be.closeTo(50, 0.0000001);

    var south = points[4];
    expect(south.x()).to.be.closeTo(30, 0.0000001);
    expect(south.y()).to.be.closeTo(70, 0.0000001);

    var west = points[8];
    expect(west.x()).to.be.closeTo(10, 0.0000001);
    expect(west.y()).to.be.closeTo(50, 0.0000001);

    var north = points[12];
    expect(north.x()).to.be.closeTo(30, 0.0000001);
    expect(north.y()).to.be.closeTo(30, 0.0000001);
  });

  it("Rect", function() {

    function ViewModel() {
      this.shapes = ko.observableArray([
        new kd.Rect("Rectangle", 15, 16, 70, 50)
      ]);
    }

    var vm = new ViewModel();
    var outputDiv = $("#builtInShapesOutputRect");
    ko.applyBindings(vm, outputDiv.get(0));

    var rects = outputDiv.find("rect");
    expect(rects.length).to.be.equal(1);

    var first = $(rects.get(0));
    expect(first.attr("width")).to.be.equal("70");
    expect(first.attr("height")).to.be.equal("50");
    expect(first.get(0).constructor.name).to.be.equal("SVGRectElement");

    var parent = first.parent();
    expect(parent.attr("transform")).to.be.equal("translate(15 16)");
    expect(parent.get(0).constructor.name).to.be.equal("SVGGElement");

    var text = parent.find("text");
    expect(text.length).to.be.equal(1);
    expect(text.text()).to.be.equal("Rectangle");
    expect(text.get(0).constructor.name).to.be.equal("SVGTextElement");

    vm.shapes()[0].moveTo(20, 10);
    expect(parent.attr("transform")).to.be.equal("translate(20 10)");
  });

  it("Rect supports observables", function() {
    var x = ko.observable(15);
    var y = ko.observable(45);
    var width = ko.pureComputed(() => x() * 2);
    var height = ko.pureComputed(() => y());
    function ViewModel() {
      this.shapes = ko.observableArray([
        new kd.Rect("Rectangle1", x, y, width, height)
      ]);
    }

    var vm = new ViewModel();
    var outputDiv = $("#builtInShapesOutputRectSupportsObservables");
    ko.applyBindings(vm, outputDiv.get(0));

    var rects = outputDiv.find("rect");
    expect(rects.length).to.be.equal(1);

    var first = $(rects.get(0));
    expect(first.attr("width")).to.be.equal("30");
    expect(first.attr("height")).to.be.equal("45");

    var parent = first.parent();
    expect(parent.attr("transform")).to.be.equal("translate(15 45)");

    var text = parent.find("text");
    expect(text.length).to.be.equal(1);
    expect(text.text()).to.be.equal("Rectangle1");
  });

  it("Diamond", function() {

    function ViewModel() {
      this.shapes = ko.observableArray([
        new kd.Diamond("Node", 15, 20, 60)
      ]);
    }

    var vm = new ViewModel();
    var outputDiv = $("#builtInShapesOutputDiamond");
    ko.applyBindings(vm, outputDiv.get(0));

    var polygons = outputDiv.find("polygon");
    expect(polygons.length).to.be.equal(1);

    var first = $(polygons.get(0));
    expect(first.attr("points")).to.be.equal("0,30 30,0 60,30 30,60");
    expect(first.get(0).constructor.name).to.be.equal("SVGPolygonElement");

    var parent = first.parent();
    expect(parent.attr("transform")).to.be.equal("translate(15 20)");
    expect(parent.get(0).constructor.name).to.be.equal("SVGGElement");

    var text = parent.find("text");
    expect(text.length).to.be.equal(1);
    expect(text.text()).to.be.equal("Node");
    expect(text.get(0).constructor.name).to.be.equal("SVGTextElement");

    vm.shapes()[0].moveTo(20, 10);
    expect(parent.attr("transform")).to.be.equal("translate(20 10)");
  });

  it("Diamond supports observables", function() {
    var x = ko.observable(12);
    var y = ko.observable(13);
    var width = ko.pureComputed(() => 20);
    function ViewModel() {
      this.shapes = ko.observableArray([
        new kd.Diamond("Node2", x, y, width)
      ]);
    }

    var vm = new ViewModel();
    var outputDiv = $("#builtInShapesOutputDiamondSupportsObservables");
    ko.applyBindings(vm, outputDiv.get(0));

    var polygons = outputDiv.find("polygon");
    expect(polygons.length).to.be.equal(1);

    var first = $(polygons.get(0));
    expect(first.attr("points")).to.be.equal("0,10 10,0 20,10 10,20");

    var parent = first.parent();
    expect(parent.attr("transform")).to.be.equal("translate(12 13)");

    var text = parent.find("text");
    expect(text.length).to.be.equal(1);
    expect(text.text()).to.be.equal("Node2");
    expect(text.get(0).constructor.name).to.be.equal("SVGTextElement");

    vm.shapes()[0].moveTo(20, 10);
    expect(parent.attr("transform")).to.be.equal("translate(20 10)");
  });

});
