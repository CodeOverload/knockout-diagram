"use strict";

class End {
  constructor(point, style) {
    this.point = ko.observable(point);
    this.style = ko.observable(style);

    this.tMove = ko.pureComputed(
      () => `translate(${this.point().x()} ${this.point().y()})`);
  }
}

export default End;
