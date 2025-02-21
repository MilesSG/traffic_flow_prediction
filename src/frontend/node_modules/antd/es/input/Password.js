import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import EyeInvisibleOutlined from "@ant-design/icons/es/icons/EyeInvisibleOutlined";
import EyeOutlined from "@ant-design/icons/es/icons/EyeOutlined";
import classNames from 'classnames';
import omit from "rc-util/es/omit";
import { composeRef } from "rc-util/es/ref";
import * as React from 'react';
import { useRef, useState } from 'react';
import { ConfigConsumer } from '../config-provider';
import useRemovePasswordTimeout from './hooks/useRemovePasswordTimeout';
import Input from './Input';
var defaultIconRender = function defaultIconRender(visible) {
  return visible ? /*#__PURE__*/React.createElement(EyeOutlined, null) : /*#__PURE__*/React.createElement(EyeInvisibleOutlined, null);
};
var ActionMap = {
  click: 'onClick',
  hover: 'onMouseOver'
};
var Password = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$visibilityTogg = props.visibilityToggle,
    visibilityToggle = _props$visibilityTogg === void 0 ? true : _props$visibilityTogg;
  var visibilityControlled = _typeof(visibilityToggle) === 'object' && visibilityToggle.visible !== undefined;
  var _useState = useState(function () {
      return visibilityControlled ? visibilityToggle.visible : false;
    }),
    _useState2 = _slicedToArray(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  var inputRef = useRef(null);
  React.useEffect(function () {
    if (visibilityControlled) {
      setVisible(visibilityToggle.visible);
    }
  }, [visibilityControlled, visibilityToggle]);
  // Remove Password value
  var removePasswordTimeout = useRemovePasswordTimeout(inputRef);
  var onVisibleChange = function onVisibleChange() {
    var disabled = props.disabled;
    if (disabled) {
      return;
    }
    if (visible) {
      removePasswordTimeout();
    }
    setVisible(function (prevState) {
      var _a;
      var newState = !prevState;
      if (_typeof(visibilityToggle) === 'object') {
        (_a = visibilityToggle.onVisibleChange) === null || _a === void 0 ? void 0 : _a.call(visibilityToggle, newState);
      }
      return newState;
    });
  };
  var getIcon = function getIcon(prefixCls) {
    var _props$action = props.action,
      action = _props$action === void 0 ? 'click' : _props$action,
      _props$iconRender = props.iconRender,
      iconRender = _props$iconRender === void 0 ? defaultIconRender : _props$iconRender;
    var iconTrigger = ActionMap[action] || '';
    var icon = iconRender(visible);
    var iconProps = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, iconTrigger, onVisibleChange), "className", "".concat(prefixCls, "-icon")), "key", 'passwordIcon'), "onMouseDown", function onMouseDown(e) {
      // Prevent focused state lost
      // https://github.com/ant-design/ant-design/issues/15173
      e.preventDefault();
    }), "onMouseUp", function onMouseUp(e) {
      // Prevent caret position change
      // https://github.com/ant-design/ant-design/issues/23524
      e.preventDefault();
    });
    return /*#__PURE__*/React.cloneElement( /*#__PURE__*/React.isValidElement(icon) ? icon : /*#__PURE__*/React.createElement("span", null, icon), iconProps);
  };
  var renderPassword = function renderPassword(_ref) {
    var getPrefixCls = _ref.getPrefixCls;
    var className = props.className,
      customizePrefixCls = props.prefixCls,
      customizeInputPrefixCls = props.inputPrefixCls,
      size = props.size,
      restProps = __rest(props, ["className", "prefixCls", "inputPrefixCls", "size"]);
    var inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
    var prefixCls = getPrefixCls('input-password', customizePrefixCls);
    var suffixIcon = visibilityToggle && getIcon(prefixCls);
    var inputClassName = classNames(prefixCls, className, _defineProperty({}, "".concat(prefixCls, "-").concat(size), !!size));
    var omittedProps = _extends(_extends({}, omit(restProps, ['suffix', 'iconRender', 'visibilityToggle'])), {
      type: visible ? 'text' : 'password',
      className: inputClassName,
      prefixCls: inputPrefixCls,
      suffix: suffixIcon
    });
    if (size) {
      omittedProps.size = size;
    }
    return /*#__PURE__*/React.createElement(Input, _extends({
      ref: composeRef(ref, inputRef)
    }, omittedProps));
  };
  return /*#__PURE__*/React.createElement(ConfigConsumer, null, renderPassword);
});
if (process.env.NODE_ENV !== 'production') {
  Password.displayName = 'Password';
}
export default Password;