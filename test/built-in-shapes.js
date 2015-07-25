
describe("Built in shapes", function() {

  it("Circle", function() {
  
    function ViewModel() {
      this.shapes = ko.observableArray([
        new kd.Circle(40, 50, 10)
      ]);
    }
    
    var vm = new ViewModel();
    var outputDiv = $("#builtInShapesOutputCircle");
    ko.applyBindings(vm, outputDiv.get(0));
    
    var circles = outputDiv.find("circle");
    expect(circles.length).to.be.equal(1);
    
    var first = $(circles.get(0));
    expect(first.attr("cx")).to.be.equal("40");
    expect(first.attr("cy")).to.be.equal("50");
    expect(first.attr("r")).to.be.equal("10");
    expect(first.get(0).constructor.name).to.be.equal("SVGCircleElement");
    
    vm.shapes()[0].moveTo(20, 10);
    expect(first.attr("cx")).to.be.equal("30");
    expect(first.attr("cy")).to.be.equal("20");
  });

  it("Rect", function() {
  
    function ViewModel() {
      this.shapes = ko.observableArray([
        new kd.Rect(15, 16, 40, 50)
      ]);
    }
    
    var vm = new ViewModel();
    var outputDiv = $("#builtInShapesOutputRect");
    ko.applyBindings(vm, outputDiv.get(0));
    
    var rects = outputDiv.find("rect");
    expect(rects.length).to.be.equal(1);
    
    var first = $(rects.get(0));
    expect(first.attr("x")).to.be.equal("15");
    expect(first.attr("y")).to.be.equal("16");
    expect(first.attr("width")).to.be.equal("40");
    expect(first.attr("height")).to.be.equal("50");
    expect(first.get(0).constructor.name).to.be.equal("SVGRectElement");
    
    vm.shapes()[0].moveTo(20, 10);
    expect(first.attr("x")).to.be.equal("20");
    expect(first.attr("y")).to.be.equal("10");
  });
  
});
