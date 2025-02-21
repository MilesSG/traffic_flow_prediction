import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import classNames from 'classnames';
import RcDrawer from 'rc-drawer';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { NoFormStyle } from '../form/context';
import { getTransitionName } from '../_util/motion';
import { tuple } from '../_util/type';
import warning from '../_util/warning';
import { NoCompactStyle } from '../space/Compact';
var SizeTypes = tuple('default', 'large');
var defaultPushState = {
  distance: 180
};
function Drawer(props) {
  var width = props.width,
    height = props.height,
    _props$size = props.size,
    size = _props$size === void 0 ? 'default' : _props$size,
    _props$closable = props.closable,
    closable = _props$closable === void 0 ? true : _props$closable,
    _props$mask = props.mask,
    mask = _props$mask === void 0 ? true : _props$mask,
    _props$push = props.push,
    push = _props$push === void 0 ? defaultPushState : _props$push,
    _props$closeIcon = props.closeIcon,
    closeIcon = _props$closeIcon === void 0 ? /*#__PURE__*/React.createElement(CloseOutlined, null) : _props$closeIcon,
    bodyStyle = props.bodyStyle,
    drawerStyle = props.drawerStyle,
    className = props.className,
    visible = props.visible,
    open = props.open,
    children = props.children,
    style = props.style,
    title = props.title,
    headerStyle = props.headerStyle,
    onClose = props.onClose,
    footer = props.footer,
    footerStyle = props.footerStyle,
    customizePrefixCls = props.prefixCls,
    customizeGetContainer = props.getContainer,
    extra = props.extra,
    afterVisibleChange = props.afterVisibleChange,
    _afterOpenChange = props.afterOpenChange,
    rest = __rest(props, ["width", "height", "size", "closable", "mask", "push", "closeIcon", "bodyStyle", "drawerStyle", "className", "visible", "open", "children", "style", "title", "headerStyle", "onClose", "footer", "footerStyle", "prefixCls", "getContainer", "extra", "afterVisibleChange", "afterOpenChange"]);
  var _React$useContext = React.useContext(ConfigContext),
    getPopupContainer = _React$useContext.getPopupContainer,
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var prefixCls = getPrefixCls('drawer', customizePrefixCls);
  var getContainer =
  // 有可能为 false，所以不能直接判断
  customizeGetContainer === undefined && getPopupContainer ? function () {
    return getPopupContainer(document.body);
  } : customizeGetContainer;
  var closeIconNode = closable && ( /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    className: "".concat(prefixCls, "-close")
  }, closeIcon));
  [['visible', 'open'], ['afterVisibleChange', 'afterOpenChange']].forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      deprecatedName = _ref2[0],
      newName = _ref2[1];
    process.env.NODE_ENV !== "production" ? warning(!(deprecatedName in props), 'Drawer', "`".concat(deprecatedName, "` is deprecated which will be removed in next major version, please use `").concat(newName, "` instead.")) : void 0;
  });
  function renderHeader() {
    if (!title && !closable) {
      return null;
    }
    return /*#__PURE__*/React.createElement("div", {
      className: classNames("".concat(prefixCls, "-header"), _defineProperty({}, "".concat(prefixCls, "-header-close-only"), closable && !title && !extra)),
      style: headerStyle
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-header-title")
    }, closeIconNode, title && /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-title")
    }, title)), extra && /*#__PURE__*/React.createElement("div", {
      className: "".concat(prefixCls, "-extra")
    }, extra));
  }
  function renderFooter() {
    if (!footer) {
      return null;
    }
    var footerClassName = "".concat(prefixCls, "-footer");
    return /*#__PURE__*/React.createElement("div", {
      className: footerClassName,
      style: footerStyle
    }, footer);
  }
  var drawerClassName = classNames(_defineProperty({
    'no-mask': !mask
  }, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  // ============================ Size ============================
  var mergedWidth = React.useMemo(function () {
    return width !== null && width !== void 0 ? width : size === 'large' ? 736 : 378;
  }, [width, size]);
  var mergedHeight = React.useMemo(function () {
    return height !== null && height !== void 0 ? height : size === 'large' ? 736 : 378;
  }, [height, size]);
  // =========================== Motion ===========================
  var maskMotion = {
    motionName: getTransitionName(prefixCls, 'mask-motion'),
    motionAppear: true,
    motionEnter: true,
    motionLeave: true,
    motionDeadline: 500
  };
  var panelMotion = function panelMotion(motionPlacement) {
    return {
      motionName: getTransitionName(prefixCls, "panel-motion-".concat(motionPlacement)),
      motionAppear: true,
      motionEnter: true,
      motionLeave: true,
      motionDeadline: 500
    };
  };
  // =========================== Render ===========================
  return /*#__PURE__*/React.createElement(NoCompactStyle, null, /*#__PURE__*/React.createElement(NoFormStyle, {
    status: true,
    override: true
  }, /*#__PURE__*/React.createElement(RcDrawer, _extends({
    prefixCls: prefixCls,
    onClose: onClose
  }, rest, {
    open: open !== null && open !== void 0 ? open : visible,
    mask: mask,
    push: push,
    width: mergedWidth,
    height: mergedHeight,
    rootClassName: drawerClassName,
    getContainer: getContainer,
    afterOpenChange: function afterOpenChange(isOpen) {
      _afterOpenChange === null || _afterOpenChange === void 0 ? void 0 : _afterOpenChange(isOpen);
      afterVisibleChange === null || afterVisibleChange === void 0 ? void 0 : afterVisibleChange(isOpen);
    },
    maskMotion: maskMotion,
    motion: panelMotion,
    rootStyle: style
  }), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-wrapper-body"),
    style: _extends({}, drawerStyle)
  }, renderHeader(), /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-body"),
    style: bodyStyle
  }, children), renderFooter()))));
}
if (process.env.NODE_ENV !== 'production') {
  Drawer.displayName = 'Drawer';
}
export default Drawer;