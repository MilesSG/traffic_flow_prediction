"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generatePicker;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _CalendarOutlined = _interopRequireDefault(require("@ant-design/icons/CalendarOutlined"));
var _ClockCircleOutlined = _interopRequireDefault(require("@ant-design/icons/ClockCircleOutlined"));
var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcPicker = _interopRequireDefault(require("rc-picker"));
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _Compact = require("../../space/Compact");
var _ = require(".");
var _configProvider = require("../../config-provider");
var _DisabledContext = _interopRequireDefault(require("../../config-provider/DisabledContext"));
var _SizeContext = _interopRequireDefault(require("../../config-provider/SizeContext"));
var _context = require("../../form/context");
var _LocaleReceiver = _interopRequireDefault(require("../../locale-provider/LocaleReceiver"));
var _statusUtils = require("../../_util/statusUtils");
var _warning = _interopRequireDefault(require("../../_util/warning"));
var _en_US = _interopRequireDefault(require("../locale/en_US"));
var _util = require("../util");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function generatePicker(generateConfig) {
  function getPicker(picker, displayName) {
    var Picker = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
      var customizePrefixCls = props.prefixCls,
        customizeGetPopupContainer = props.getPopupContainer,
        className = props.className,
        customizeSize = props.size,
        _props$bordered = props.bordered,
        bordered = _props$bordered === void 0 ? true : _props$bordered,
        placement = props.placement,
        placeholder = props.placeholder,
        popupClassName = props.popupClassName,
        dropdownClassName = props.dropdownClassName,
        customDisabled = props.disabled,
        customStatus = props.status,
        restProps = __rest(props, ["prefixCls", "getPopupContainer", "className", "size", "bordered", "placement", "placeholder", "popupClassName", "dropdownClassName", "disabled", "status"]);
      var _useContext = (0, _react.useContext)(_configProvider.ConfigContext),
        getPrefixCls = _useContext.getPrefixCls,
        direction = _useContext.direction,
        getPopupContainer = _useContext.getPopupContainer;
      var prefixCls = getPrefixCls('picker', customizePrefixCls);
      var _useCompactItemContex = (0, _Compact.useCompactItemContext)(prefixCls, direction),
        compactSize = _useCompactItemContex.compactSize,
        compactItemClassnames = _useCompactItemContex.compactItemClassnames;
      var innerRef = React.useRef(null);
      var format = props.format,
        showTime = props.showTime;
      (0, _react.useImperativeHandle)(ref, function () {
        return {
          focus: function focus() {
            var _a;
            return (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
          },
          blur: function blur() {
            var _a;
            return (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.blur();
          }
        };
      });
      var additionalProps = {
        showToday: true
      };
      var additionalOverrideProps = {};
      if (picker) {
        additionalOverrideProps.picker = picker;
      }
      var mergedPicker = picker || props.picker;
      additionalOverrideProps = (0, _extends2["default"])((0, _extends2["default"])((0, _extends2["default"])({}, additionalOverrideProps), showTime ? (0, _.getTimeProps)((0, _extends2["default"])({
        format: format,
        picker: mergedPicker
      }, showTime)) : {}), mergedPicker === 'time' ? (0, _.getTimeProps)((0, _extends2["default"])((0, _extends2["default"])({
        format: format
      }, props), {
        picker: mergedPicker
      })) : {});
      var rootPrefixCls = getPrefixCls();
      // =================== Warning =====================
      process.env.NODE_ENV !== "production" ? (0, _warning["default"])(picker !== 'quarter', displayName, "DatePicker.".concat(displayName, " is legacy usage. Please use DatePicker[picker='").concat(picker, "'] directly.")) : void 0;
      process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!dropdownClassName, mergedPicker === 'time' ? 'TimePicker' : 'DatePicker', '`dropdownClassName` is deprecated which will be removed in next major version. Please use `popupClassName` instead.') : void 0;
      // ===================== Size =====================
      var size = React.useContext(_SizeContext["default"]);
      var mergedSize = compactSize || customizeSize || size;
      // ===================== Disabled =====================
      var disabled = React.useContext(_DisabledContext["default"]);
      var mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
      // ===================== FormItemInput =====================
      var formItemContext = (0, _react.useContext)(_context.FormItemInputContext);
      var hasFeedback = formItemContext.hasFeedback,
        contextStatus = formItemContext.status,
        feedbackIcon = formItemContext.feedbackIcon;
      var suffixNode = /*#__PURE__*/React.createElement(React.Fragment, null, mergedPicker === 'time' ? /*#__PURE__*/React.createElement(_ClockCircleOutlined["default"], null) : /*#__PURE__*/React.createElement(_CalendarOutlined["default"], null), hasFeedback && feedbackIcon);
      return /*#__PURE__*/React.createElement(_LocaleReceiver["default"], {
        componentName: "DatePicker",
        defaultLocale: _en_US["default"]
      }, function (contextLocale) {
        var locale = (0, _extends2["default"])((0, _extends2["default"])({}, contextLocale), props.locale);
        return /*#__PURE__*/React.createElement(_rcPicker["default"], (0, _extends2["default"])({
          ref: innerRef,
          placeholder: (0, _util.getPlaceholder)(mergedPicker, locale, placeholder),
          suffixIcon: suffixNode,
          dropdownAlign: (0, _util.transPlacement2DropdownAlign)(direction, placement),
          clearIcon: /*#__PURE__*/React.createElement(_CloseCircleFilled["default"], null),
          prevIcon: /*#__PURE__*/React.createElement("span", {
            className: "".concat(prefixCls, "-prev-icon")
          }),
          nextIcon: /*#__PURE__*/React.createElement("span", {
            className: "".concat(prefixCls, "-next-icon")
          }),
          superPrevIcon: /*#__PURE__*/React.createElement("span", {
            className: "".concat(prefixCls, "-super-prev-icon")
          }),
          superNextIcon: /*#__PURE__*/React.createElement("span", {
            className: "".concat(prefixCls, "-super-next-icon")
          }),
          allowClear: true,
          transitionName: "".concat(rootPrefixCls, "-slide-up")
        }, additionalProps, restProps, additionalOverrideProps, {
          locale: locale.lang,
          className: (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-").concat(mergedSize), mergedSize), "".concat(prefixCls, "-borderless"), !bordered), (0, _statusUtils.getStatusClassNames)(prefixCls, (0, _statusUtils.getMergedStatus)(contextStatus, customStatus), hasFeedback), compactItemClassnames, className),
          prefixCls: prefixCls,
          getPopupContainer: customizeGetPopupContainer || getPopupContainer,
          generateConfig: generateConfig,
          components: _.Components,
          direction: direction,
          disabled: mergedDisabled,
          dropdownClassName: popupClassName || dropdownClassName
        }));
      });
    });
    if (displayName) {
      Picker.displayName = displayName;
    }
    return Picker;
  }
  var DatePicker = getPicker();
  var WeekPicker = getPicker('week', 'WeekPicker');
  var MonthPicker = getPicker('month', 'MonthPicker');
  var YearPicker = getPicker('year', 'YearPicker');
  var TimePicker = getPicker('time', 'TimePicker');
  var QuarterPicker = getPicker('quarter', 'QuarterPicker');
  return {
    DatePicker: DatePicker,
    WeekPicker: WeekPicker,
    MonthPicker: MonthPicker,
    YearPicker: YearPicker,
    TimePicker: TimePicker,
    QuarterPicker: QuarterPicker
  };
}