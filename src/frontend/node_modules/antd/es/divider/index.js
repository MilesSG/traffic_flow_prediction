import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';
var Divider = function Divider(props) {
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var customizePrefixCls = props.prefixCls,
    _props$type = props.type,
    type = _props$type === void 0 ? 'horizontal' : _props$type,
    _props$orientation = props.orientation,
    orientation = _props$orientation === void 0 ? 'center' : _props$orientation,
    orientationMargin = props.orientationMargin,
    className = props.className,
    children = props.children,
    dashed = props.dashed,
    plain = props.plain,
    restProps = __rest(props, ["prefixCls", "type", "orientation", "orientationMargin", "className", "children", "dashed", "plain"]);
  var prefixCls = getPrefixCls('divider', customizePrefixCls);
  var orientationPrefix = orientation.length > 0 ? "-".concat(orientation) : orientation;
  var hasChildren = !!children;
  var hasCustomMarginLeft = orientation === 'left' && orientationMargin != null;
  var hasCustomMarginRight = orientation === 'right' && orientationMargin != null;
  var classString = classNames(prefixCls, "".concat(prefixCls, "-").concat(type), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-with-text"), hasChildren), "".concat(prefixCls, "-with-text").concat(orientationPrefix), hasChildren), "".concat(prefixCls, "-dashed"), !!dashed), "".concat(prefixCls, "-plain"), !!plain), "".concat(prefixCls, "-rtl"), direction === 'rtl'), "".concat(prefixCls, "-no-default-orientation-margin-left"), hasCustomMarginLeft), "".concat(prefixCls, "-no-default-orientation-margin-right"), hasCustomMarginRight), className);
  var innerStyle = _extends(_extends({}, hasCustomMarginLeft && {
    marginLeft: orientationMargin
  }), hasCustomMarginRight && {
    marginRight: orientationMargin
  });
  // Warning children not work in vertical mode
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? warning(!children || type !== 'vertical', 'Divider', '`children` not working in `vertical` mode.') : void 0;
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classString
  }, restProps, {
    role: "separator"
  }), children && type !== 'vertical' && ( /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-inner-text"),
    style: innerStyle
  }, children)));
};
export default Divider;