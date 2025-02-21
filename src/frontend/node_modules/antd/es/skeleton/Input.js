import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import classNames from 'classnames';
import omit from "rc-util/es/omit";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Element from './Element';
var SkeletonInput = function SkeletonInput(props) {
  var customizePrefixCls = props.prefixCls,
    className = props.className,
    active = props.active,
    block = props.block,
    _props$size = props.size,
    size = _props$size === void 0 ? 'default' : _props$size;
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls;
  var prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  var otherProps = omit(props, ['prefixCls']);
  var cls = classNames(prefixCls, "".concat(prefixCls, "-element"), _defineProperty(_defineProperty({}, "".concat(prefixCls, "-active"), active), "".concat(prefixCls, "-block"), block), className);
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, /*#__PURE__*/React.createElement(Element, _extends({
    prefixCls: "".concat(prefixCls, "-input"),
    size: size
  }, otherProps)));
};
export default SkeletonInput;