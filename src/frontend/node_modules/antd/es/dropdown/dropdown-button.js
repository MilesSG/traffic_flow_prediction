import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import EllipsisOutlined from "@ant-design/icons/es/icons/EllipsisOutlined";
import classNames from 'classnames';
import * as React from 'react';
import Button from '../button';
import { ConfigContext } from '../config-provider';
import { useCompactItemContext } from '../space/Compact';
import Dropdown from './dropdown';
import Space from '../space';
var DropdownButton = function DropdownButton(props) {
  var _React$useContext = React.useContext(ConfigContext),
    getContextPopupContainer = _React$useContext.getPopupContainer,
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var customizePrefixCls = props.prefixCls,
    _props$type = props.type,
    type = _props$type === void 0 ? 'default' : _props$type,
    danger = props.danger,
    disabled = props.disabled,
    loading = props.loading,
    onClick = props.onClick,
    htmlType = props.htmlType,
    children = props.children,
    className = props.className,
    menu = props.menu,
    arrow = props.arrow,
    autoFocus = props.autoFocus,
    overlay = props.overlay,
    trigger = props.trigger,
    align = props.align,
    visible = props.visible,
    open = props.open,
    onVisibleChange = props.onVisibleChange,
    onOpenChange = props.onOpenChange,
    placement = props.placement,
    getPopupContainer = props.getPopupContainer,
    href = props.href,
    _props$icon = props.icon,
    icon = _props$icon === void 0 ? /*#__PURE__*/React.createElement(EllipsisOutlined, null) : _props$icon,
    title = props.title,
    _props$buttonsRender = props.buttonsRender,
    buttonsRender = _props$buttonsRender === void 0 ? function (buttons) {
      return buttons;
    } : _props$buttonsRender,
    mouseEnterDelay = props.mouseEnterDelay,
    mouseLeaveDelay = props.mouseLeaveDelay,
    overlayClassName = props.overlayClassName,
    overlayStyle = props.overlayStyle,
    destroyPopupOnHide = props.destroyPopupOnHide,
    restProps = __rest(props, ["prefixCls", "type", "danger", "disabled", "loading", "onClick", "htmlType", "children", "className", "menu", "arrow", "autoFocus", "overlay", "trigger", "align", "visible", "open", "onVisibleChange", "onOpenChange", "placement", "getPopupContainer", "href", "icon", "title", "buttonsRender", "mouseEnterDelay", "mouseLeaveDelay", "overlayClassName", "overlayStyle", "destroyPopupOnHide"]);
  var prefixCls = getPrefixCls('dropdown-button', customizePrefixCls);
  var dropdownProps = {
    menu: menu,
    arrow: arrow,
    autoFocus: autoFocus,
    align: align,
    disabled: disabled,
    trigger: disabled ? [] : trigger,
    onOpenChange: onOpenChange || onVisibleChange,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    mouseEnterDelay: mouseEnterDelay,
    mouseLeaveDelay: mouseLeaveDelay,
    overlayClassName: overlayClassName,
    overlayStyle: overlayStyle,
    destroyPopupOnHide: destroyPopupOnHide
  };
  var _useCompactItemContex = useCompactItemContext(prefixCls, direction),
    compactSize = _useCompactItemContex.compactSize,
    compactItemClassnames = _useCompactItemContex.compactItemClassnames;
  var classes = classNames(prefixCls, compactItemClassnames, className);
  if ('overlay' in props) {
    dropdownProps.overlay = overlay;
  }
  if ('open' in props) {
    dropdownProps.open = open;
  } else if ('visible' in props) {
    dropdownProps.open = visible;
  }
  if ('placement' in props) {
    dropdownProps.placement = placement;
  } else {
    dropdownProps.placement = direction === 'rtl' ? 'bottomLeft' : 'bottomRight';
  }
  var leftButton = /*#__PURE__*/React.createElement(Button, {
    type: type,
    danger: danger,
    disabled: disabled,
    loading: loading,
    onClick: onClick,
    htmlType: htmlType,
    href: href,
    title: title
  }, children);
  var rightButton = /*#__PURE__*/React.createElement(Button, {
    type: type,
    danger: danger,
    icon: icon
  });
  var _buttonsRender = buttonsRender([leftButton, rightButton]),
    _buttonsRender2 = _slicedToArray(_buttonsRender, 2),
    leftButtonToRender = _buttonsRender2[0],
    rightButtonToRender = _buttonsRender2[1];
  return /*#__PURE__*/React.createElement(Space.Compact, _extends({
    className: classes,
    size: compactSize,
    block: true
  }, restProps), leftButtonToRender, /*#__PURE__*/React.createElement(Dropdown, _extends({}, dropdownProps), rightButtonToRender));
};
DropdownButton.__ANT_BUTTON = true;
export default DropdownButton;