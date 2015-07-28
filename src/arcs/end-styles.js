"use strict";

import EndStyle from "./end-style";

let none = new EndStyle("kd-arc-end-none");
let arrow = new EndStyle("kd-arc-end-arrow");
let diamond = new EndStyle("kd-arc-end-diamond");
let circle = new EndStyle("kd-arc-end-circle");

function styles() {
  return {
    None: none,
    Arrow: arrow,
    Diamond: diamond,
    Circle: circle
  };
}

export default styles;
