"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _raf = _interopRequireDefault(require("rc-util/lib/raf"));
var _ref = require("rc-util/lib/ref");
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _tooltip = _interopRequireDefault(require("../tooltip"));
var SliderTooltip = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var open = props.open;
  var innerRef = (0, _react.useRef)(null);
  var rafRef = (0, _react.useRef)(null);
  function cancelKeepAlign() {
    _raf["default"].cancel(rafRef.current);
    rafRef.current = null;
  }
  function keepAlign() {
    rafRef.current = (0, _raf["default"])(function () {
      var _a;
      (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.forcePopupAlign();
      rafRef.current = null;
    });
  }
  React.useEffect(function () {
    if (open) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }
    return cancelKeepAlign;
  }, [open, props.title]);
  return /*#__PURE__*/React.createElement(_tooltip["default"], (0, _extends2["default"])({
    ref: (0, _ref.composeRef)(innerRef, ref)
  }, props));
});
var _default = exports["default"] = SliderTooltip;