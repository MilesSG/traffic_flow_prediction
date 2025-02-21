"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classnames = _interopRequireDefault(require("classnames"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _Element = _interopRequireDefault(require("./Element"));
var SkeletonButton = function SkeletonButton(props) {
  var customizePrefixCls = props.prefixCls,
    className = props.className,
    active = props.active,
    _props$block = props.block,
    block = _props$block === void 0 ? false : _props$block,
    _props$size = props.size,
    size = _props$size === void 0 ? 'default' : _props$size;
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls;
  var prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  var otherProps = (0, _omit["default"])(props, ['prefixCls']);
  var cls = (0, _classnames["default"])(prefixCls, "".concat(prefixCls, "-element"), (0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-active"), active), "".concat(prefixCls, "-block"), block), className);
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, /*#__PURE__*/React.createElement(_Element["default"], (0, _extends2["default"])({
    prefixCls: "".concat(prefixCls, "-button"),
    size: size
  }, otherProps)));
};
var _default = exports["default"] = SkeletonButton;