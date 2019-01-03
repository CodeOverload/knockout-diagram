
describe("Arcs", function() {

  it("Shape to shape arcs should render correctly", function() {

    function ViewModel() {
      var circle = new kd.Circle("Start", 10, 0, 40);
      var diamond = new kd.Diamond("You rang?", 130, 0, 80, 100);
      var rect = new kd.Rect("Finish", 130, 110, 80, 30);

      this.shapes = ko.observableArray([
        circle, diamond, rect
      ]);

      this.arcs = ko.observableArray([
        new kd.Arc(
          new kd.End(circle.points[0], kd.endStyles.Arrow),
          new kd.End(diamond.points[3], kd.endStyles.Diamond)
        ),
        new kd.Arc(
          new kd.End(diamond.points[2], kd.endStyles.None),
          new kd.End(rect.points[0], kd.endStyles.Circle)
        )
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
    expect(first.attr("y2")).to.be.equal("50");
    expect(first.get(0).constructor.name).to.be.equal("SVGLineElement");

    var second = $(arcs.get(1));
    expect(second.attr("x1")).to.be.equal("170");
    expect(second.attr("y1")).to.be.equal("100");
    expect(second.attr("x2")).to.be.equal("170");
    expect(second.attr("y2")).to.be.equal("110");
    expect(second.get(0).constructor.name).to.be.equal("SVGLineElement");

    // Move one of the shapes and check that the arc moves too
    vm.shapes()[0].moveTo(20, 20);

    expect(first.attr("x1")).to.be.equal("100");
    expect(first.attr("y1")).to.be.equal("60");
    expect(first.attr("x2")).to.be.equal("130");
    expect(first.attr("y2")).to.be.equal("50");
  });


  it("Ends should be positioned and rotated correctly", function() {

    function ViewModel() {
      var a = new kd.Circle("A", 100, 10, 20);
      var b = new kd.Circle("B", 50, 80, 20);
      var c = new kd.Circle("C", 150, 80, 20);
      var d = new kd.Circle("D", 100, 100, 20);

      this.shapes = ko.observableArray([a, b, c, d]);

      this.arcs = ko.observableArray([
        new kd.Arc(
          new kd.End(a.points[8], kd.endStyles.Arrow),
          new kd.End(b.points[12], kd.endStyles.Arrow)
        ),
        new kd.Arc(
          new kd.End(a.points[0], kd.endStyles.Arrow),
          new kd.End(c.points[12], kd.endStyles.Diamond)
        ),
        new kd.Arc(
          new kd.End(d.points[12], kd.endStyles.Arrow),
          new kd.End(a.points[4], kd.endStyles.Diamond)
        )
      ]);
    }

    var vm = new ViewModel();
    var outputDiv = $("#arcsEndpointsCorrectlyPositioned");
    ko.applyBindings(vm, outputDiv.get(0));

    var arcs = outputDiv.find(".kd-arc");
    expect(arcs.length).to.be.equal(3);

    var first = $(arcs.get(0));
    checkEnd(first.find(".kd-arc-end").get(0), 100, 30, -59.04);
    checkEnd(first.find(".kd-arc-end").get(1), 70, 80, -239.04);

    var second = $(arcs.get(1));
    checkEnd(second.find(".kd-arc-end").get(0), 140, 30, -120.96);
    checkEnd(second.find(".kd-arc-end").get(1), 170, 80, -300.96);

    var third = $(arcs.get(2));
    checkEnd(third.find(".kd-arc-end").get(0), 120, 100, 90);
    checkEnd(third.find(".kd-arc-end").get(1), 120, 50, -90);

    // Move one of the shapes and check that the arc/ends move too
    vm.shapes()[1].moveTo(0, 40);

    checkEnd(first.find(".kd-arc-end").get(0), 100, 30, -7.13);
    checkEnd(first.find(".kd-arc-end").get(1), 20, 40, -187.13);
  });

  it("Arc supports observables", function() {

    function ViewModel() {
      var circle = this.circle = new kd.Circle("Start", 10, 0, 40);
      var diamond = this.diamond = new kd.Diamond("You rang?", 130, 0, 80, 120);
      var rect = this.rect = new kd.Rect("Finish", 130, 110, 80, 30);

      this.shapes = ko.observableArray([
        circle, diamond, rect
      ]);

      this.end1 = ko.observable(circle.points[0]);
      this.end2 = ko.observable(diamond.points[3]);

      this.arcs = ko.observableArray([
        new kd.Arc(
          new kd.End(this.end1, ko.observable(kd.endStyles.Arrow)),
          new kd.End(this.end2, kd.endStyles.Diamond)
        )
      ]);
    }

    var vm = new ViewModel();
    var outputDiv = $("#arcSupportsObservables");
    ko.applyBindings(vm, outputDiv.get(0));

    var arcs = outputDiv.find("line");
    expect(arcs.length).to.be.equal(1);

    var first = $(arcs.get(0));
    expect(first.attr("x1")).to.be.equal("90");
    expect(first.attr("y1")).to.be.equal("40");
    expect(first.attr("x2")).to.be.equal("130");
    expect(first.attr("y2")).to.be.equal("60");

    // Change the arc to span from different points, and check
    // the attributes are changed as expected
    vm.end1(vm.diamond.points[2]);
    vm.end2(vm.rect.points[0]);
    expect(first.attr("x1")).to.be.equal("170");
    expect(first.attr("y1")).to.be.equal("120");
    expect(first.attr("x2")).to.be.equal("170");
    expect(first.attr("y2")).to.be.equal("110");
  });

});

function checkEnd(el, x, y, angle2dp) {
  var pattern = /translate\((-?[\\.0-9]+) (-?[\\.0-9]+)\) rotate\((-?[\\.0-9]+)\)/;
  var transform = $(el).attr("transform");
  expect(transform).to.match(pattern);

  var parts = transform.match(pattern);
  var ax = parts[1], ay = parts[2], aangle = parts[3];

  expect(x).to.be.closeTo(parseFloat(ax), 0.0000001);
  expect(y).to.be.closeTo(parseFloat(ay), 0.0000001);
  // Just check to 2dp - that's more than sufficient to check
  // that the calculations are correct
  expect(angle2dp.toFixed(2))
    .to.be.equal(parseFloat(aangle).toFixed(2));
}
