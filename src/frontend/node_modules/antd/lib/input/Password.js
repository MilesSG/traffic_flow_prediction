"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _EyeInvisibleOutlined = _interopRequireDefault(require("@ant-design/icons/EyeInvisibleOutlined"));
var _EyeOutlined = _interopRequireDefault(require("@ant-design/icons/EyeOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var _ref2 = require("rc-util/lib/ref");
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _configProvider = require("../config-provider");
var _useRemovePasswordTimeout = _interopRequireDefault(require("./hooks/useRemovePasswordTimeout"));
var _Input = _interopRequireDefault(require("./Input"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var defaultIconRender = function defaultIconRender(visible) {
  return visible ? /*#__PURE__*/React.createElement(_EyeOutlined["default"], null) : /*#__PURE__*/React.createElement(_EyeInvisibleOutlined["default"], null);
};
var ActionMap = {
  click: 'onClick',
  hover: 'onMouseOver'
};
var Password = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$visibilityTogg = props.visibilityToggle,
    visibilityToggle = _props$visibilityTogg === void 0 ? true : _props$visibilityTogg;
  var visibilityControlled = (0, _typeof2["default"])(visibilityToggle) === 'object' && visibilityToggle.visible !== undefined;
  var _useState = (0, _react.useState)(function () {
      return visibilityControlled ? visibilityToggle.visible : false;
    }),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  var inputRef = (0, _react.useRef)(null);
  React.useEffect(function () {
    if (visibilityControlled) {
      setVisible(visibilityToggle.visible);
    }
  }, [visibilityControlled, visibilityToggle]);
  // Remove Password value
  var removePasswordTimeout = (0, _useRemovePasswordTimeout["default"])(inputRef);
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
      if ((0, _typeof2["default"])(visibilityToggle) === 'object') {
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
    var iconProps = (0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, iconTrigger, onVisibleChange), "className", "".concat(prefixCls, "-icon")), "key", 'passwordIcon'), "onMouseDown", function onMouseDown(e) {
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
    var inputClassName = (0, _classnames["default"])(prefixCls, className, (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-").concat(size), !!size));
    var omittedProps = (0, _extends2["default"])((0, _extends2["default"])({}, (0, _omit["default"])(restProps, ['suffix', 'iconRender', 'visibilityToggle'])), {
      type: visible ? 'text' : 'password',
      className: inputClassName,
      prefixCls: inputPrefixCls,
      suffix: suffixIcon
    });
    if (size) {
      omittedProps.size = size;
    }
    return /*#__PURE__*/React.createElement(_Input["default"], (0, _extends2["default"])({
      ref: (0, _ref2.composeRef)(ref, inputRef)
    }, omittedProps));
  };
  return /*#__PURE__*/React.createElement(_configProvider.ConfigConsumer, null, renderPassword);
});
if (process.env.NODE_ENV !== 'production') {
  Password.displayName = 'Password';
}
var _default = exports["default"] = Password;