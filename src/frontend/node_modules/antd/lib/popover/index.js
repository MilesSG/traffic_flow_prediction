"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _getRenderPropValue = require("../_util/getRenderPropValue");
var _motion = require("../_util/motion");
var _configProvider = require("../config-provider");
var _tooltip = _interopRequireDefault(require("../tooltip"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var Overlay = function Overlay(_ref) {
  var title = _ref.title,
    content = _ref.content,
    prefixCls = _ref.prefixCls;
  return /*#__PURE__*/React.createElement(React.Fragment, null, title && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-title")
  }, (0, _getRenderPropValue.getRenderPropValue)(title)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-inner-content")
  }, (0, _getRenderPropValue.getRenderPropValue)(content)));
};
var Popover = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var customizePrefixCls = props.prefixCls,
    title = props.title,
    content = props.content,
    _overlay = props._overlay,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'top' : _props$placement,
    _props$trigger = props.trigger,
    trigger = _props$trigger === void 0 ? 'hover' : _props$trigger,
    _props$mouseEnterDela = props.mouseEnterDelay,
    mouseEnterDelay = _props$mouseEnterDela === void 0 ? 0.1 : _props$mouseEnterDela,
    _props$mouseLeaveDela = props.mouseLeaveDelay,
    mouseLeaveDelay = _props$mouseLeaveDela === void 0 ? 0.1 : _props$mouseLeaveDela,
    _props$overlayStyle = props.overlayStyle,
    overlayStyle = _props$overlayStyle === void 0 ? {} : _props$overlayStyle,
    otherProps = __rest(props, ["prefixCls", "title", "content", "_overlay", "placement", "trigger", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle"]);
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls;
  var prefixCls = getPrefixCls('popover', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();
  var mergedOverlay = React.useMemo(function () {
    if (_overlay) {
      return _overlay;
    }
    if (!title && !content) {
      return null;
    }
    return /*#__PURE__*/React.createElement(Overlay, {
      prefixCls: prefixCls,
      title: title,
      content: content
    });
  }, [_overlay, title, content, prefixCls]);
  return /*#__PURE__*/React.createElement(_tooltip["default"], (0, _extends2["default"])({
    placement: placement,
    trigger: trigger,
    mouseEnterDelay: mouseEnterDelay,
    mouseLeaveDelay: mouseLeaveDelay,
    overlayStyle: overlayStyle
  }, otherProps, {
    prefixCls: prefixCls,
    ref: ref,
    overlay: mergedOverlay,
    transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'zoom-big', otherProps.transitionName)
  }));
});
if (process.env.NODE_ENV !== 'production') {
  Popover.displayName = 'Popover';
}
var _default = exports["default"] = Popover;