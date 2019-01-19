
// Built in templates, to save the client defining these. See StringTemplateEngine
const templates = {

  "kd-shape-circle":
    `<g data-bind="attr: { transform: tPosition }">
      <circle data-bind="attr: { cx: xradius, cy: xradius, r: xradius }" />
      <text data-bind="attr: { x: xradius, y: xradius }, text: text" text-anchor="middle" dy="0.3em" />
    </g>`,

  "kd-shape-rect":
    `<g data-bind="attr: { transform: tPosition }">
      <rect data-bind="attr: { width: width, height: height }" />
      <text data-bind="attr: { x: xradius, y: yradius }, text: text" text-anchor="middle" dy="0.3em" />
    </g>`,

  "kd-shape-diamond":
    `<g data-bind="attr: { transform: tPosition }">
      <polygon data-bind="polygonPoints: { xfactor: width, yfactor: height,
                          points: '0,0.5 0.5,0 1,0.5 0.5,1'}" />
      <text data-bind="attr: { x: xradius, y: yradius }, text: text" text-anchor="middle" dy="0.3em" />
    </g>`,

  "kd-arc":
    `<line class="kd-arc-line" data-bind="attr: { x1: endA.point().x, y1: endA.point().y,
                                                x2: endB.point().x, y2: endB.point().y }" />

    <!-- ko with: endA -->
      <g data-bind="template: { name: style().templateName, svg: true },
                    attr: { class: 'kd-arc-end ' + style().templateName,
                            transform: tMove() + ' ' + $parent.tRotateEndA() }" />
    <!-- /ko -->

    <!-- ko with: endB -->
      <g data-bind="template: { name: style().templateName, svg: true },
                    attr: { class: 'kd-arc-end ' + style().templateName,
                            transform: tMove() + ' ' + $parent.tRotateEndB() }" />
    <!-- /ko -->`,

  "kd-arc-end-none":
    '',

  "kd-arc-end-arrow":
    `<polygon data-bind="polygonPoints: { xfactor: 8, yfactor: 4, points: '0,0 -1,1 -1,-1'}" />`,

  "kd-arc-end-circle":
    `<circle cx="-4" cy="0" r="4" />`,

  "kd-arc-end-diamond":
    `<polygon data-bind="polygonPoints: { xfactor: 16, yfactor: 4, points: '0,0 -0.5,1 -1,0 -0.5,-1'}" />`
};

export default Object.freeze(templates);