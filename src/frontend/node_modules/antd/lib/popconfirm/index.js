"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _ExclamationCircleFilled = _interopRequireDefault(require("@ant-design/icons/ExclamationCircleFilled"));
var _classnames = _interopRequireDefault(require("classnames"));
var _useMergedState3 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _popover = _interopRequireDefault(require("../popover"));
var _reactNode = require("../_util/reactNode");
var _PurePanel = require("./PurePanel");
var _this = void 0;
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var Popconfirm = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var customizePrefixCls = props.prefixCls,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'top' : _props$placement,
    _props$trigger = props.trigger,
    trigger = _props$trigger === void 0 ? 'click' : _props$trigger,
    _props$okType = props.okType,
    okType = _props$okType === void 0 ? 'primary' : _props$okType,
    _props$icon = props.icon,
    icon = _props$icon === void 0 ? /*#__PURE__*/React.createElement(_ExclamationCircleFilled["default"], null) : _props$icon,
    children = props.children,
    overlayClassName = props.overlayClassName,
    onOpenChange = props.onOpenChange,
    onVisibleChange = props.onVisibleChange,
    restProps = __rest(props, ["prefixCls", "placement", "trigger", "okType", "icon", "children", "overlayClassName", "onOpenChange", "onVisibleChange"]);
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls;
  var _useMergedState = (0, _useMergedState3["default"])(false, {
      value: props.open !== undefined ? props.open : props.visible,
      defaultValue: props.defaultOpen !== undefined ? props.defaultOpen : props.defaultVisible
    }),
    _useMergedState2 = (0, _slicedToArray2["default"])(_useMergedState, 2),
    open = _useMergedState2[0],
    setOpen = _useMergedState2[1];
  // const isDestroyed = useDestroyed();
  var settingOpen = function settingOpen(value, e) {
    setOpen(value, true);
    onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(value, e);
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(value, e);
  };
  var close = function close(e) {
    settingOpen(false, e);
  };
  var onConfirm = function onConfirm(e) {
    var _a;
    return (_a = props.onConfirm) === null || _a === void 0 ? void 0 : _a.call(_this, e);
  };
  var onCancel = function onCancel(e) {
    var _a;
    settingOpen(false, e);
    (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(_this, e);
  };
  var _onKeyDown = function onKeyDown(e) {
    if (e.keyCode === _KeyCode["default"].ESC && open) {
      settingOpen(false, e);
    }
  };
  var onInternalOpenChange = function onInternalOpenChange(value) {
    var _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled;
    if (disabled) {
      return;
    }
    settingOpen(value);
  };
  var prefixCls = getPrefixCls('popover', customizePrefixCls);
  var prefixClsConfirm = getPrefixCls('popconfirm', customizePrefixCls);
  var overlayClassNames = (0, _classnames["default"])(prefixClsConfirm, overlayClassName);
  return /*#__PURE__*/React.createElement(_popover["default"], (0, _extends2["default"])({}, restProps, {
    trigger: trigger,
    prefixCls: prefixCls,
    placement: placement,
    onOpenChange: onInternalOpenChange,
    open: open,
    ref: ref,
    overlayClassName: overlayClassNames,
    _overlay: /*#__PURE__*/React.createElement(_PurePanel.Overlay, (0, _extends2["default"])({
      okType: okType,
      icon: icon
    }, props, {
      prefixCls: prefixCls,
      close: close,
      onConfirm: onConfirm,
      onCancel: onCancel
    }))
  }), (0, _reactNode.cloneElement)(children, {
    onKeyDown: function onKeyDown(e) {
      var _a, _b;
      if ( /*#__PURE__*/React.isValidElement(children)) {
        (_b = children === null || children === void 0 ? void 0 : (_a = children.props).onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, e);
      }
      _onKeyDown(e);
    }
  }));
});
var _default = exports["default"] = Popconfirm;