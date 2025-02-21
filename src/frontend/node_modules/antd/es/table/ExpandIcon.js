import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import classNames from 'classnames';
import * as React from 'react';
function renderExpandIcon(locale) {
  return function expandIcon(_ref) {
    var prefixCls = _ref.prefixCls,
      onExpand = _ref.onExpand,
      record = _ref.record,
      expanded = _ref.expanded,
      expandable = _ref.expandable;
    var iconPrefix = "".concat(prefixCls, "-row-expand-icon");
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick(e) {
        onExpand(record, e);
        e.stopPropagation();
      },
      className: classNames(iconPrefix, _defineProperty(_defineProperty(_defineProperty({}, "".concat(iconPrefix, "-spaced"), !expandable), "".concat(iconPrefix, "-expanded"), expandable && expanded), "".concat(iconPrefix, "-collapsed"), expandable && !expanded)),
      "aria-label": expanded ? locale.collapse : locale.expand,
      "aria-expanded": expanded
    });
  };
}
export default renderExpandIcon;