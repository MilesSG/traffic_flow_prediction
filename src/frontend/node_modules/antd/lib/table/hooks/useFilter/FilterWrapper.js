"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var React = _interopRequireWildcard(require("react"));
var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));
var onKeyDown = function onKeyDown(event) {
  var keyCode = event.keyCode;
  if (keyCode === _KeyCode["default"].ENTER) {
    event.stopPropagation();
  }
};
var FilterDropdownMenuWrapper = function FilterDropdownMenuWrapper(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    onKeyDown: onKeyDown
  }, props.children);
};
var _default = exports["default"] = FilterDropdownMenuWrapper;