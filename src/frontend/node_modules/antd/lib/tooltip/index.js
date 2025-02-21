"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcTooltip = _interopRequireDefault(require("rc-tooltip"));
var _useMergedState3 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _colors = require("../_util/colors");
var _motion = require("../_util/motion");
var _placements = _interopRequireDefault(require("../_util/placements"));
var _reactNode = require("../_util/reactNode");
var _warning = _interopRequireDefault(require("../_util/warning"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var splitObject = function splitObject(obj, keys) {
  var picked = {};
  var omitted = (0, _extends2["default"])({}, obj);
  keys.forEach(function (key) {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return {
    picked: picked,
    omitted: omitted
  };
};
var PresetColorRegex = new RegExp("^(".concat(_colors.PresetColorTypes.join('|'), ")(-inverse)?$"));
// Fix Tooltip won't hide at disabled button
// mouse events don't trigger at disabled button in Chrome
// https://github.com/react-component/tooltip/issues/18
function getDisabledCompatibleChildren(element, prefixCls) {
  var elementType = element.type;
  if ((elementType.__ANT_BUTTON === true || element.type === 'button') && element.props.disabled || elementType.__ANT_SWITCH === true && (element.props.disabled || element.props.loading) || elementType.__ANT_RADIO === true && element.props.disabled) {
    // Pick some layout related style properties up to span
    // Prevent layout bugs like https://github.com/ant-design/ant-design/issues/5254
    var _splitObject = splitObject(element.props.style, ['position', 'left', 'right', 'top', 'bottom', 'float', 'display', 'zIndex']),
      picked = _splitObject.picked,
      omitted = _splitObject.omitted;
    var spanStyle = (0, _extends2["default"])((0, _extends2["default"])({
      display: 'inline-block'
    }, picked), {
      cursor: 'not-allowed',
      width: element.props.block ? '100%' : undefined
    });
    var buttonStyle = (0, _extends2["default"])((0, _extends2["default"])({}, omitted), {
      pointerEvents: 'none'
    });
    var child = (0, _reactNode.cloneElement)(element, {
      style: buttonStyle,
      className: null
    });
    return /*#__PURE__*/React.createElement("span", {
      style: spanStyle,
      className: (0, _classnames["default"])(element.props.className, "".concat(prefixCls, "-disabled-compatible-wrapper"))
    }, child);
  }
  return element;
}
var Tooltip = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getContextPopupContainer = _React$useContext.getPopupContainer,
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  // Warning for deprecated usage
  if (process.env.NODE_ENV !== 'production') {
    [['visible', 'open'], ['defaultVisible', 'defaultOpen'], ['onVisibleChange', 'onOpenChange'], ['afterVisibleChange', 'afterOpenChange']].forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        deprecatedName = _ref2[0],
        newName = _ref2[1];
      process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!(deprecatedName in props), 'Tooltip', "`".concat(deprecatedName, "` is deprecated which will be removed in next major version, please use `").concat(newName, "` instead.")) : void 0;
    });
  }
  var _useMergedState = (0, _useMergedState3["default"])(false, {
      value: props.open !== undefined ? props.open : props.visible,
      defaultValue: props.defaultOpen !== undefined ? props.defaultOpen : props.defaultVisible
    }),
    _useMergedState2 = (0, _slicedToArray2["default"])(_useMergedState, 2),
    open = _useMergedState2[0],
    setOpen = _useMergedState2[1];
  var isNoTitle = function isNoTitle() {
    var title = props.title,
      overlay = props.overlay;
    return !title && !overlay && title !== 0; // overlay for old version compatibility
  };
  var onOpenChange = function onOpenChange(vis) {
    var _a, _b;
    setOpen(isNoTitle() ? false : vis);
    if (!isNoTitle()) {
      (_a = props.onOpenChange) === null || _a === void 0 ? void 0 : _a.call(props, vis);
      (_b = props.onVisibleChange) === null || _b === void 0 ? void 0 : _b.call(props, vis);
    }
  };
  var getTooltipPlacements = function getTooltipPlacements() {
    var builtinPlacements = props.builtinPlacements,
      _props$arrowPointAtCe = props.arrowPointAtCenter,
      arrowPointAtCenter = _props$arrowPointAtCe === void 0 ? false : _props$arrowPointAtCe,
      _props$autoAdjustOver = props.autoAdjustOverflow,
      autoAdjustOverflow = _props$autoAdjustOver === void 0 ? true : _props$autoAdjustOver;
    return builtinPlacements || (0, _placements["default"])({
      arrowPointAtCenter: arrowPointAtCenter,
      autoAdjustOverflow: autoAdjustOverflow
    });
  };
  // 动态设置动画点
  var onPopupAlign = function onPopupAlign(domNode, align) {
    var placements = getTooltipPlacements();
    // 当前返回的位置
    var placement = Object.keys(placements).find(function (key) {
      var _a, _b;
      return placements[key].points[0] === ((_a = align.points) === null || _a === void 0 ? void 0 : _a[0]) && placements[key].points[1] === ((_b = align.points) === null || _b === void 0 ? void 0 : _b[1]);
    });
    if (!placement) {
      return;
    }
    // 根据当前坐标设置动画点
    var rect = domNode.getBoundingClientRect();
    var transformOrigin = {
      top: '50%',
      left: '50%'
    };
    if (/top|Bottom/.test(placement)) {
      transformOrigin.top = "".concat(rect.height - align.offset[1], "px");
    } else if (/Top|bottom/.test(placement)) {
      transformOrigin.top = "".concat(-align.offset[1], "px");
    }
    if (/left|Right/.test(placement)) {
      transformOrigin.left = "".concat(rect.width - align.offset[0], "px");
    } else if (/right|Left/.test(placement)) {
      transformOrigin.left = "".concat(-align.offset[0], "px");
    }
    domNode.style.transformOrigin = "".concat(transformOrigin.left, " ").concat(transformOrigin.top);
  };
  var getOverlay = function getOverlay() {
    var title = props.title,
      overlay = props.overlay;
    if (title === 0) {
      return title;
    }
    return overlay || title || '';
  };
  var getPopupContainer = props.getPopupContainer,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'top' : _props$placement,
    _props$mouseEnterDela = props.mouseEnterDelay,
    mouseEnterDelay = _props$mouseEnterDela === void 0 ? 0.1 : _props$mouseEnterDela,
    _props$mouseLeaveDela = props.mouseLeaveDelay,
    mouseLeaveDelay = _props$mouseLeaveDela === void 0 ? 0.1 : _props$mouseLeaveDela,
    otherProps = __rest(props, ["getPopupContainer", "placement", "mouseEnterDelay", "mouseLeaveDelay"]);
  var customizePrefixCls = props.prefixCls,
    openClassName = props.openClassName,
    getTooltipContainer = props.getTooltipContainer,
    overlayClassName = props.overlayClassName,
    color = props.color,
    overlayInnerStyle = props.overlayInnerStyle,
    children = props.children;
  var prefixCls = getPrefixCls('tooltip', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();
  var tempOpen = open;
  // Hide tooltip when there is no title
  if (!('open' in props) && !('visible' in props) && isNoTitle()) {
    tempOpen = false;
  }
  var child = getDisabledCompatibleChildren((0, _reactNode.isValidElement)(children) && !(0, _reactNode.isFragment)(children) ? children : /*#__PURE__*/React.createElement("span", null, children), prefixCls);
  var childProps = child.props;
  var childCls = !childProps.className || typeof childProps.className === 'string' ? (0, _classnames["default"])(childProps.className, (0, _defineProperty2["default"])({}, openClassName || "".concat(prefixCls, "-open"), true)) : childProps.className;
  var customOverlayClassName = (0, _classnames["default"])(overlayClassName, (0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), "".concat(prefixCls, "-").concat(color), color && PresetColorRegex.test(color)));
  var formattedOverlayInnerStyle = overlayInnerStyle;
  var arrowContentStyle = {};
  if (color && !PresetColorRegex.test(color)) {
    formattedOverlayInnerStyle = (0, _extends2["default"])((0, _extends2["default"])({}, overlayInnerStyle), {
      background: color
    });
    // @ts-ignore
    arrowContentStyle = {
      '--antd-arrow-background-color': color
    };
  }
  return /*#__PURE__*/React.createElement(_rcTooltip["default"], (0, _extends2["default"])({}, otherProps, {
    placement: placement,
    mouseEnterDelay: mouseEnterDelay,
    mouseLeaveDelay: mouseLeaveDelay,
    prefixCls: prefixCls,
    overlayClassName: customOverlayClassName,
    getTooltipContainer: getPopupContainer || getTooltipContainer || getContextPopupContainer,
    ref: ref,
    builtinPlacements: getTooltipPlacements(),
    overlay: getOverlay(),
    visible: tempOpen,
    onVisibleChange: onOpenChange,
    onPopupAlign: onPopupAlign,
    overlayInnerStyle: formattedOverlayInnerStyle,
    arrowContent: /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-arrow-content"),
      style: arrowContentStyle
    }),
    motion: {
      motionName: (0, _motion.getTransitionName)(rootPrefixCls, 'zoom-big-fast', props.transitionName),
      motionDeadline: 1000
    }
  }), tempOpen ? (0, _reactNode.cloneElement)(child, {
    className: childCls
  }) : child);
});
if (process.env.NODE_ENV !== 'production') {
  Tooltip.displayName = 'Tooltip';
}
var _default = exports["default"] = Tooltip;