import Circle from "./shapes/circle";
import Diamond from "./shapes/diamond";
import Rect from "./shapes/rect";

import Point from "./point";

import Arc from "./arcs/arc";
import End from "./arcs/end";

import endStyles from "./arcs/end-styles";

import "./ko/string-template-engine";
import "./ko/polygon-points";

const ends = endStyles();

export { Point, Arc, End,
  ends as endStyles,
  Circle, Diamond, Rect
};
