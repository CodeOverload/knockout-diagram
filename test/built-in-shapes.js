
describe("Built-in shapes", function() {

  it("Circle", function() {
  
    function ViewModel() {
      this.shapes = ko.observableArray([
        new kd.Circle("A label", 40, 50, 10)
      ]);
    }
    
    var vm = new ViewModel();
    var outputDiv = $("#builtInShapesOutputCircle");
    ko.applyBindings(vm, outputDiv.get(0));
    
    var circles = outputDiv.find("circle");
    expect(circles.length).to.be.equal(1);
    
    var first = $(circles.get(0));
    expect(first.attr("cx")).to.be.equal("10");
    expect(first.attr("cy")).to.be.equal("10");
    expect(first.attr("r")).to.be.equal("10");
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

  it("Rect", function() {
  
    function ViewModel() {
      this.shapes = ko.observableArray([
        new kd.Rect("Rectangle", 15, 16, 40, 50)
      ]);
    }
    
    var vm = new ViewModel();
    var outputDiv = $("#builtInShapesOutputRect");
    ko.applyBindings(vm, outputDiv.get(0));
    
    var rects = outputDiv.find("rect");
    expect(rects.length).to.be.equal(1);
    
    var first = $(rects.get(0));
    expect(first.attr("width")).to.be.equal("40");
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
  
});
