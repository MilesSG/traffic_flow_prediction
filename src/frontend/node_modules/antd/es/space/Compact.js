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
import toArray from "rc-util/es/Children/toArray";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
export var SpaceCompactItemContext = /*#__PURE__*/React.createContext(null);
export var useCompactItemContext = function useCompactItemContext(prefixCls, direction) {
  var compactItemContext = React.useContext(SpaceCompactItemContext);
  var compactItemClassnames = React.useMemo(function () {
    if (!compactItemContext) return '';
    var compactDirection = compactItemContext.compactDirection,
      isFirstItem = compactItemContext.isFirstItem,
      isLastItem = compactItemContext.isLastItem;
    var separator = compactDirection === 'vertical' ? '-vertical-' : '-';
    return classNames(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-compact").concat(separator, "item"), true), "".concat(prefixCls, "-compact").concat(separator, "first-item"), isFirstItem), "".concat(prefixCls, "-compact").concat(separator, "last-item"), isLastItem), "".concat(prefixCls, "-compact").concat(separator, "item-rtl"), direction === 'rtl'));
  }, [prefixCls, direction, compactItemContext]);
  return {
    compactSize: compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.compactSize,
    compactDirection: compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.compactDirection,
    compactItemClassnames: compactItemClassnames
  };
};
export var NoCompactStyle = function NoCompactStyle(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(SpaceCompactItemContext.Provider, {
    value: null
  }, children);
};
var CompactItem = function CompactItem(_a) {
  var children = _a.children,
    otherProps = __rest(_a, ["children"]);
  return /*#__PURE__*/React.createElement(SpaceCompactItemContext.Provider, {
    value: otherProps
  }, children);
};
var Compact = function Compact(props) {
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    directionConfig = _React$useContext.direction;
  var _props$size = props.size,
    size = _props$size === void 0 ? 'middle' : _props$size,
    direction = props.direction,
    block = props.block,
    customizePrefixCls = props.prefixCls,
    className = props.className,
    children = props.children,
    restProps = __rest(props, ["size", "direction", "block", "prefixCls", "className", "children"]);
  var prefixCls = getPrefixCls('space-compact', customizePrefixCls);
  var clx = classNames(prefixCls, _defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-rtl"), directionConfig === 'rtl'), "".concat(prefixCls, "-block"), block), "".concat(prefixCls, "-vertical"), direction === 'vertical'), className);
  var compactItemContext = React.useContext(SpaceCompactItemContext);
  var childNodes = toArray(children);
  var nodes = React.useMemo(function () {
    return childNodes.map(function (child, i) {
      var key = child && child.key || "".concat(prefixCls, "-item-").concat(i);
      return /*#__PURE__*/React.createElement(CompactItem, {
        key: key,
        compactSize: size,
        compactDirection: direction,
        isFirstItem: i === 0 && (!compactItemContext || (compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.isFirstItem)),
        isLastItem: i === childNodes.length - 1 && (!compactItemContext || (compactItemContext === null || compactItemContext === void 0 ? void 0 : compactItemContext.isLastItem))
      }, child);
    });
  }, [size, childNodes, compactItemContext]);
  // =========================== Render ===========================
  if (childNodes.length === 0) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clx
  }, restProps), nodes);
};
export default Compact;