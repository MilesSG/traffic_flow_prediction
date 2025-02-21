"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useAnimateConfig;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _motion = require("../../_util/motion");
var motion = {
  motionAppear: false,
  motionEnter: true,
  motionLeave: true
};
function useAnimateConfig(prefixCls) {
  var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    inkBar: true,
    tabPane: false
  };
  var mergedAnimated;
  if (animated === false) {
    mergedAnimated = {
      inkBar: false,
      tabPane: false
    };
  } else if (animated === true) {
    mergedAnimated = {
      inkBar: true,
      tabPane: true
    };
  } else {
    mergedAnimated = (0, _extends2["default"])({
      inkBar: true
    }, (0, _typeof2["default"])(animated) === 'object' ? animated : {});
  }
  if (mergedAnimated.tabPane) {
    mergedAnimated.tabPaneMotion = (0, _extends2["default"])((0, _extends2["default"])({}, motion), {
      motionName: (0, _motion.getTransitionName)(prefixCls, 'switch')
    });
  }
  return mergedAnimated;
}