
describe("Non-SVG (standard knockout)", function() {
  
  describe("Anonymous templates", function() {

    it("foreach", function() {
    
      function ViewModel() {
        this.numbers = ko.observableArray([4, 7, 8]);
      }
      
      var vm = new ViewModel();
      var outputDiv = $("#nonSvgForEach");
      ko.applyBindings(vm, outputDiv.get(0));
      
      var numbers = outputDiv.find("span");
      expect(numbers.length).to.be.equal(3);
      
      var first = $(numbers.get(0));
      expect(first.text()).to.be.equal("4");
      expect(first.get(0).constructor.name).to.be.equal("HTMLSpanElement");
      
      vm.numbers.push(9);
      numbers = outputDiv.find("span");
      expect($(numbers.get(3)).text()).to.be.equal("9");
    });
  });
  
  describe("Named templates", function() {

    it("Should render correctly", function() {
    
      function ViewModel() {
        this.numbers = ko.observableArray([1, 2, 4]);
      }
      
      var vm = new ViewModel();
      var outputDiv = $("#nonSvgNamedTemplate1");
      ko.applyBindings(vm, outputDiv.get(0));
      
      var numbers = outputDiv.find("div");
      expect(numbers.length).to.be.equal(3);
      
      var first = $(numbers.get(0));
      expect(first.text()).to.be.equal("1");
      expect(first.get(0).constructor.name).to.be.equal("HTMLDivElement");
      
      vm.numbers.push(10);
      numbers = outputDiv.find("div");
      expect($(numbers.get(3)).text()).to.be.equal("10");
    });
  });
  
  describe("Bind template to DOM nodes in view model", function() {

    it("Should render correctly", function() {
    
      // Not sure what the use case is for this functionality is, 
      // but this causes it to trigger the cached node logic in the 
      // template engine. For each data item in the view model, we
      // need to supply a dom node
      var node1 = $("<span>Test</span>").get(0);
      var node2 = $("<span>A</span>").get(0)
    
      function ViewModel() {
        this.numbers = ko.observableArray([[node1], [node2]]);
      }
      
      var vm = new ViewModel();
      var outputDiv = $("#nonSvgBindToNodes");
      ko.applyBindings(vm, outputDiv.get(0));
      
      var numbers = outputDiv.find("span");
      expect(numbers.length).to.be.equal(2);
      
      var first = $(numbers.get(0));
      expect(first.text()).to.be.equal("Test");
      expect(first.get(0).constructor.name).to.be.equal("HTMLSpanElement");
      
      var second = $(numbers.get(1));
      expect(second.text()).to.be.equal("A");
      expect(second.get(0).constructor.name).to.be.equal("HTMLSpanElement");
    });
  });
});
