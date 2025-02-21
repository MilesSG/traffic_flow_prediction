"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcMotion = _interopRequireDefault(require("rc-motion"));
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _configProvider = require("../config-provider");
var _reactNode = require("../_util/reactNode");
var _Ribbon = _interopRequireDefault(require("./Ribbon"));
var _ScrollNumber = _interopRequireDefault(require("./ScrollNumber"));
var _utils = require("./utils");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var Badge = function Badge(_a) {
  var customizePrefixCls = _a.prefixCls,
    customizeScrollNumberPrefixCls = _a.scrollNumberPrefixCls,
    children = _a.children,
    status = _a.status,
    text = _a.text,
    color = _a.color,
    _a$count = _a.count,
    count = _a$count === void 0 ? null : _a$count,
    _a$overflowCount = _a.overflowCount,
    overflowCount = _a$overflowCount === void 0 ? 99 : _a$overflowCount,
    _a$dot = _a.dot,
    dot = _a$dot === void 0 ? false : _a$dot,
    _a$size = _a.size,
    size = _a$size === void 0 ? 'default' : _a$size,
    title = _a.title,
    offset = _a.offset,
    style = _a.style,
    className = _a.className,
    _a$showZero = _a.showZero,
    showZero = _a$showZero === void 0 ? false : _a$showZero,
    restProps = __rest(_a, ["prefixCls", "scrollNumberPrefixCls", "children", "status", "text", "color", "count", "overflowCount", "dot", "size", "title", "offset", "style", "className", "showZero"]);
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  var prefixCls = getPrefixCls('badge', customizePrefixCls);
  // ================================ Misc ================================
  var numberedDisplayCount = count > overflowCount ? "".concat(overflowCount, "+") : count;
  var isZero = numberedDisplayCount === '0' || numberedDisplayCount === 0;
  var ignoreCount = count === null || isZero && !showZero;
  var hasStatus = (status !== null && status !== undefined || color !== null && color !== undefined) && ignoreCount;
  var showAsDot = dot && !isZero;
  var mergedCount = showAsDot ? '' : numberedDisplayCount;
  var isHidden = (0, _react.useMemo)(function () {
    var isEmpty = mergedCount === null || mergedCount === undefined || mergedCount === '';
    return (isEmpty || isZero && !showZero) && !showAsDot;
  }, [mergedCount, isZero, showZero, showAsDot]);
  // Count should be cache in case hidden change it
  var countRef = (0, _react.useRef)(count);
  if (!isHidden) {
    countRef.current = count;
  }
  var livingCount = countRef.current;
  // We need cache count since remove motion should not change count display
  var displayCountRef = (0, _react.useRef)(mergedCount);
  if (!isHidden) {
    displayCountRef.current = mergedCount;
  }
  var displayCount = displayCountRef.current;
  // We will cache the dot status to avoid shaking on leaved motion
  var isDotRef = (0, _react.useRef)(showAsDot);
  if (!isHidden) {
    isDotRef.current = showAsDot;
  }
  // =============================== Styles ===============================
  var mergedStyle = (0, _react.useMemo)(function () {
    if (!offset) {
      return (0, _extends2["default"])({}, style);
    }
    var offsetStyle = {
      marginTop: offset[1]
    };
    if (direction === 'rtl') {
      offsetStyle.left = parseInt(offset[0], 10);
    } else {
      offsetStyle.right = -parseInt(offset[0], 10);
    }
    return (0, _extends2["default"])((0, _extends2["default"])({}, offsetStyle), style);
  }, [direction, offset, style]);
  // =============================== Render ===============================
  // >>> Title
  var titleNode = title !== null && title !== void 0 ? title : typeof livingCount === 'string' || typeof livingCount === 'number' ? livingCount : undefined;
  // >>> Status Text
  var statusTextNode = isHidden || !text ? null : /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-status-text")
  }, text);
  // >>> Display Component
  var displayNode = !livingCount || (0, _typeof2["default"])(livingCount) !== 'object' ? undefined : (0, _reactNode.cloneElement)(livingCount, function (oriProps) {
    return {
      style: (0, _extends2["default"])((0, _extends2["default"])({}, mergedStyle), oriProps.style)
    };
  });
  // Shared styles
  var statusCls = (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-status-dot"), hasStatus), "".concat(prefixCls, "-status-").concat(status), !!status), "".concat(prefixCls, "-status-").concat(color), (0, _utils.isPresetColor)(color)));
  var statusStyle = {};
  if (color && !(0, _utils.isPresetColor)(color)) {
    statusStyle.background = color;
  }
  var badgeClassName = (0, _classnames["default"])(prefixCls, (0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-status"), hasStatus), "".concat(prefixCls, "-not-a-wrapper"), !children), "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  // <Badge status="success" />
  if (!children && hasStatus) {
    var statusTextColor = mergedStyle.color;
    return /*#__PURE__*/React.createElement("span", (0, _extends2["default"])({}, restProps, {
      className: badgeClassName,
      style: mergedStyle
    }), /*#__PURE__*/React.createElement("span", {
      className: statusCls,
      style: statusStyle
    }), text && ( /*#__PURE__*/React.createElement("span", {
      style: {
        color: statusTextColor
      },
      className: "".concat(prefixCls, "-status-text")
    }, text)));
  }
  // <Badge status="success" count={<Icon type="xxx" />}></Badge>
  return /*#__PURE__*/React.createElement("span", (0, _extends2["default"])({}, restProps, {
    className: badgeClassName
  }), children, /*#__PURE__*/React.createElement(_rcMotion["default"], {
    visible: !isHidden,
    motionName: "".concat(prefixCls, "-zoom"),
    motionAppear: false,
    motionDeadline: 1000
  }, function (_ref) {
    var motionClassName = _ref.className;
    var scrollNumberPrefixCls = getPrefixCls('scroll-number', customizeScrollNumberPrefixCls);
    var isDot = isDotRef.current;
    var scrollNumberCls = (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-dot"), isDot), "".concat(prefixCls, "-count"), !isDot), "".concat(prefixCls, "-count-sm"), size === 'small'), "".concat(prefixCls, "-multiple-words"), !isDot && displayCount && displayCount.toString().length > 1), "".concat(prefixCls, "-status-").concat(status), !!status), "".concat(prefixCls, "-status-").concat(color), (0, _utils.isPresetColor)(color)));
    var scrollNumberStyle = (0, _extends2["default"])({}, mergedStyle);
    if (color && !(0, _utils.isPresetColor)(color)) {
      scrollNumberStyle = scrollNumberStyle || {};
      scrollNumberStyle.background = color;
    }
    return /*#__PURE__*/React.createElement(_ScrollNumber["default"], {
      prefixCls: scrollNumberPrefixCls,
      show: !isHidden,
      motionClassName: motionClassName,
      className: scrollNumberCls,
      count: displayCount,
      title: titleNode,
      style: scrollNumberStyle,
      key: "scrollNumber"
    }, displayNode);
  }), statusTextNode);
};
Badge.Ribbon = _Ribbon["default"];
var _default = exports["default"] = Badge;