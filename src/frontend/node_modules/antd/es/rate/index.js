import _extends from "@babel/runtime/helpers/esm/extends";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import StarFilled from "@ant-design/icons/es/icons/StarFilled";
import RcRate from 'rc-rate';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Tooltip from '../tooltip';
var Rate = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var prefixCls = props.prefixCls,
    tooltips = props.tooltips,
    _props$character = props.character,
    character = _props$character === void 0 ? /*#__PURE__*/React.createElement(StarFilled, null) : _props$character,
    rest = __rest(props, ["prefixCls", "tooltips", "character"]);
  var characterRender = function characterRender(node, _ref) {
    var index = _ref.index;
    if (!tooltips) {
      return node;
    }
    return /*#__PURE__*/React.createElement(Tooltip, {
      title: tooltips[index]
    }, node);
  };
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var ratePrefixCls = getPrefixCls('rate', prefixCls);
  return /*#__PURE__*/React.createElement(RcRate, _extends({
    ref: ref,
    character: character,
    characterRender: characterRender
  }, rest, {
    prefixCls: ratePrefixCls,
    direction: direction
  }));
});
if (process.env.NODE_ENV !== 'production') {
  Rate.displayName = 'Rate';
}
export default Rate;