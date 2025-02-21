import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import CalendarOutlined from "@ant-design/icons/es/icons/CalendarOutlined";
import ClockCircleOutlined from "@ant-design/icons/es/icons/ClockCircleOutlined";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import SwapRightOutlined from "@ant-design/icons/es/icons/SwapRightOutlined";
import classNames from 'classnames';
import { RangePicker as RCRangePicker } from 'rc-picker';
import * as React from 'react';
import { forwardRef, useContext, useImperativeHandle } from 'react';
import { Components, getTimeProps } from '.';
import { ConfigContext } from '../../config-provider';
import DisabledContext from '../../config-provider/DisabledContext';
import SizeContext from '../../config-provider/SizeContext';
import { FormItemInputContext } from '../../form/context';
import { useCompactItemContext } from '../../space/Compact';
import LocaleReceiver from '../../locale-provider/LocaleReceiver';
import { getMergedStatus, getStatusClassNames } from '../../_util/statusUtils';
import enUS from '../locale/en_US';
import { getRangePlaceholder, transPlacement2DropdownAlign } from '../util';
import warning from '../../_util/warning';
export default function generateRangePicker(generateConfig) {
  var RangePicker = /*#__PURE__*/forwardRef(function (props, ref) {
    var customizePrefixCls = props.prefixCls,
      customGetPopupContainer = props.getPopupContainer,
      className = props.className,
      placement = props.placement,
      customizeSize = props.size,
      customDisabled = props.disabled,
      _props$bordered = props.bordered,
      bordered = _props$bordered === void 0 ? true : _props$bordered,
      placeholder = props.placeholder,
      popupClassName = props.popupClassName,
      dropdownClassName = props.dropdownClassName,
      customStatus = props.status,
      restProps = __rest(props, ["prefixCls", "getPopupContainer", "className", "placement", "size", "disabled", "bordered", "placeholder", "popupClassName", "dropdownClassName", "status"]);
    var innerRef = React.useRef(null);
    var _useContext = useContext(ConfigContext),
      getPrefixCls = _useContext.getPrefixCls,
      direction = _useContext.direction,
      getPopupContainer = _useContext.getPopupContainer;
    var prefixCls = getPrefixCls('picker', customizePrefixCls);
    var _useCompactItemContex = useCompactItemContext(prefixCls, direction),
      compactSize = _useCompactItemContex.compactSize,
      compactItemClassnames = _useCompactItemContex.compactItemClassnames;
    var format = props.format,
      showTime = props.showTime,
      picker = props.picker;
    var rootPrefixCls = getPrefixCls();
    var additionalOverrideProps = {};
    additionalOverrideProps = _extends(_extends(_extends({}, additionalOverrideProps), showTime ? getTimeProps(_extends({
      format: format,
      picker: picker
    }, showTime)) : {}), picker === 'time' ? getTimeProps(_extends(_extends({
      format: format
    }, props), {
      picker: picker
    })) : {});
    process.env.NODE_ENV !== "production" ? warning(!dropdownClassName, 'RangePicker', '`dropdownClassName` is deprecated which will be removed in next major version. Please use `popupClassName` instead.') : void 0;
    // ===================== Size =====================
    var size = React.useContext(SizeContext);
    var mergedSize = compactSize || customizeSize || size;
    // ===================== Disabled =====================
    var disabled = React.useContext(DisabledContext);
    var mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
    // ===================== FormItemInput =====================
    var formItemContext = useContext(FormItemInputContext);
    var hasFeedback = formItemContext.hasFeedback,
      contextStatus = formItemContext.status,
      feedbackIcon = formItemContext.feedbackIcon;
    var suffixNode = /*#__PURE__*/React.createElement(React.Fragment, null, picker === 'time' ? /*#__PURE__*/React.createElement(ClockCircleOutlined, null) : /*#__PURE__*/React.createElement(CalendarOutlined, null), hasFeedback && feedbackIcon);
    useImperativeHandle(ref, function () {
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
    return /*#__PURE__*/React.createElement(LocaleReceiver, {
      componentName: "DatePicker",
      defaultLocale: enUS
    }, function (contextLocale) {
      var locale = _extends(_extends({}, contextLocale), props.locale);
      return /*#__PURE__*/React.createElement(RCRangePicker, _extends({
        separator: /*#__PURE__*/React.createElement("span", {
          "aria-label": "to",
          className: "".concat(prefixCls, "-separator")
        }, /*#__PURE__*/React.createElement(SwapRightOutlined, null)),
        disabled: mergedDisabled,
        ref: innerRef,
        dropdownAlign: transPlacement2DropdownAlign(direction, placement),
        placeholder: getRangePlaceholder(picker, locale, placeholder),
        suffixIcon: suffixNode,
        clearIcon: /*#__PURE__*/React.createElement(CloseCircleFilled, null),
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
      }, restProps, additionalOverrideProps, {
        className: classNames(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-").concat(mergedSize), mergedSize), "".concat(prefixCls, "-borderless"), !bordered), getStatusClassNames(prefixCls, getMergedStatus(contextStatus, customStatus), hasFeedback), compactItemClassnames, className),
        locale: locale.lang,
        prefixCls: prefixCls,
        getPopupContainer: customGetPopupContainer || getPopupContainer,
        generateConfig: generateConfig,
        components: Components,
        direction: direction,
        dropdownClassName: popupClassName || dropdownClassName
      }));
    });
  });
  return RangePicker;
}