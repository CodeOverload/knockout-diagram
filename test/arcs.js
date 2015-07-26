
describe("Arcs", function() {

  it("Shape to shape arcs should render correctly", function() {
  
    function ViewModel() {
      var circle = new kd.Circle("Start", 10, 0, 40);
      var diamond = new kd.Diamond("You rang?", 130, 0, 80);
      var rect = new kd.Rect("Finish", 130, 110, 80, 30);
        
      this.shapes = ko.observableArray([
        circle, diamond, rect
      ]);
      
      this.arcs = ko.observableArray([
        new kd.Arc(circle.points[1], diamond.points[3]),
        new kd.Arc(diamond.points[2], rect.points[0])
      ]);
    }
    
    var vm = new ViewModel();
    var outputDiv = $("#arcsShapeToShape");
    ko.applyBindings(vm, outputDiv.get(0));
    
    var arcs = outputDiv.find("line");
    expect(arcs.length).to.be.equal(2);
    
    var first = $(arcs.get(0));
    expect(first.attr("x1")).to.be.equal("90");
    expect(first.attr("y1")).to.be.equal("40");
    expect(first.attr("x2")).to.be.equal("130");
    expect(first.attr("y2")).to.be.equal("40");
    expect(first.get(0).constructor.name).to.be.equal("SVGLineElement");
    
    var second = $(arcs.get(1));
    expect(second.attr("x1")).to.be.equal("170");
    expect(second.attr("y1")).to.be.equal("80");
    expect(second.attr("x2")).to.be.equal("170");
    expect(second.attr("y2")).to.be.equal("110");
    expect(second.get(0).constructor.name).to.be.equal("SVGLineElement");
    
    // Move one of the shapes and check that the arc moves too
    vm.shapes()[0].moveTo(20, 20);
    
    expect(first.attr("x1")).to.be.equal("100");
    expect(first.attr("y1")).to.be.equal("60");
    expect(first.attr("x2")).to.be.equal("130");
    expect(first.attr("y2")).to.be.equal("40");
  });
  
});
