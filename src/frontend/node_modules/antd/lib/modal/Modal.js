"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcDialog = _interopRequireDefault(require("rc-dialog"));
var React = _interopRequireWildcard(require("react"));
var _button = _interopRequireDefault(require("../button"));
var _button2 = require("../button/button");
var _configProvider = require("../config-provider");
var _context = require("../form/context");
var _LocaleReceiver = _interopRequireDefault(require("../locale-provider/LocaleReceiver"));
var _Compact = require("../space/Compact");
var _motion = require("../_util/motion");
var _styleChecker = require("../_util/styleChecker");
var _warning = _interopRequireDefault(require("../_util/warning"));
var _locale = require("./locale");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var mousePosition;
// ref: https://github.com/ant-design/ant-design/issues/15795
var getClickPosition = function getClickPosition(e) {
  mousePosition = {
    x: e.pageX,
    y: e.pageY
  };
  // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  setTimeout(function () {
    mousePosition = null;
  }, 100);
};
// 只有点击事件支持从鼠标位置动画展开
if ((0, _styleChecker.canUseDocElement)()) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}
var Modal = function Modal(props) {
  var _a;
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getContextPopupContainer = _React$useContext.getPopupContainer,
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var handleCancel = function handleCancel(e) {
    var onCancel = props.onCancel;
    onCancel === null || onCancel === void 0 ? void 0 : onCancel(e);
  };
  var handleOk = function handleOk(e) {
    var onOk = props.onOk;
    onOk === null || onOk === void 0 ? void 0 : onOk(e);
  };
  process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!('visible' in props), 'Modal', "`visible` will be removed in next major version, please use `open` instead.") : void 0;
  var customizePrefixCls = props.prefixCls,
    footer = props.footer,
    visible = props.visible,
    _props$open = props.open,
    open = _props$open === void 0 ? false : _props$open,
    wrapClassName = props.wrapClassName,
    centered = props.centered,
    getContainer = props.getContainer,
    closeIcon = props.closeIcon,
    _props$focusTriggerAf = props.focusTriggerAfterClose,
    focusTriggerAfterClose = _props$focusTriggerAf === void 0 ? true : _props$focusTriggerAf,
    _props$width = props.width,
    width = _props$width === void 0 ? 520 : _props$width,
    restProps = __rest(props, ["prefixCls", "footer", "visible", "open", "wrapClassName", "centered", "getContainer", "closeIcon", "focusTriggerAfterClose", "width"]);
  var prefixCls = getPrefixCls('modal', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();
  var defaultFooter = /*#__PURE__*/React.createElement(_LocaleReceiver["default"], {
    componentName: "Modal",
    defaultLocale: (0, _locale.getConfirmLocale)()
  }, function (contextLocale) {
    var okText = props.okText,
      _props$okType = props.okType,
      okType = _props$okType === void 0 ? 'primary' : _props$okType,
      cancelText = props.cancelText,
      _props$confirmLoading = props.confirmLoading,
      confirmLoading = _props$confirmLoading === void 0 ? false : _props$confirmLoading;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_button["default"], (0, _extends2["default"])({
      onClick: handleCancel
    }, props.cancelButtonProps), cancelText || contextLocale.cancelText), /*#__PURE__*/React.createElement(_button["default"], (0, _extends2["default"])({}, (0, _button2.convertLegacyProps)(okType), {
      loading: confirmLoading,
      onClick: handleOk
    }, props.okButtonProps), okText !== null && okText !== void 0 ? okText : contextLocale.okText));
  });
  var closeIconToRender = /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-close-x")
  }, closeIcon || /*#__PURE__*/React.createElement(_CloseOutlined["default"], {
    className: "".concat(prefixCls, "-close-icon")
  }));
  var wrapClassNameExtended = (0, _classnames["default"])(wrapClassName, (0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-centered"), !!centered), "".concat(prefixCls, "-wrap-rtl"), direction === 'rtl'));
  return /*#__PURE__*/React.createElement(_Compact.NoCompactStyle, null, /*#__PURE__*/React.createElement(_context.NoFormStyle, {
    status: true,
    override: true
  }, /*#__PURE__*/React.createElement(_rcDialog["default"], (0, _extends2["default"])({
    width: width
  }, restProps, {
    getContainer: getContainer === undefined ? getContextPopupContainer : getContainer,
    prefixCls: prefixCls,
    wrapClassName: wrapClassNameExtended,
    footer: footer === undefined ? defaultFooter : footer,
    visible: open || visible,
    mousePosition: (_a = restProps.mousePosition) !== null && _a !== void 0 ? _a : mousePosition,
    onClose: handleCancel,
    closeIcon: closeIconToRender,
    focusTriggerAfterClose: focusTriggerAfterClose,
    transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'zoom', props.transitionName),
    maskTransitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'fade', props.maskTransitionName)
  }))));
};
var _default = exports["default"] = Modal;