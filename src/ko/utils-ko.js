"use strict";

function wrapObservable(val) {
  if (ko.isObservable(val)) {
    return val;
  }
  return ko.observable(val);
}

export { wrapObservable };

