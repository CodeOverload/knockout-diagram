import * as ko from "knockout";

import { wrapObservable } from "../ko/utils-ko";

class End {
  constructor(point, style) {
    this.point = wrapObservable(point);
    this.style = wrapObservable(style);

    this.tMove = ko.pureComputed(
      () => `translate(${this.point().x()} ${this.point().y()})`);
  }
}

export default End;
