
import Point from "../point"

ko.bindingHandlers.shapeDrag = {
  init: function(el, valueAccessor, allBindings, shape) {

    $(el).on("dragstart", () => {
      // Prevent default FF behaviour of dragging the whole svg image
      return false;
    });

    let mouseDown = false;
    let lastPos = null;
    $(el).mousedown(e => {
        mouseDown = true;
        lastPos = Point.fromEvent(e);
      });

    $(document.body)
      .mousemove(e => {
        if (!mouseDown) return;

        let newPos = Point.fromEvent(e);
        let delta = newPos.subtract(lastPos);
        shape.move(delta.x, delta.y);
        lastPos = newPos;
      })
      .mouseup(() => mouseDown = false);
  }
};
