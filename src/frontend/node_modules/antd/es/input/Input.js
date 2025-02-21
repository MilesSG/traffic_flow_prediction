import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import classNames from 'classnames';
import RcInput from 'rc-input';
import { composeRef } from "rc-util/es/ref";
import React, { forwardRef, useContext, useEffect, useRef } from 'react';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import SizeContext from '../config-provider/SizeContext';
import { FormItemInputContext, NoFormStyle } from '../form/context';
import { NoCompactStyle, useCompactItemContext } from '../space/Compact';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import warning from '../_util/warning';
import useRemovePasswordTimeout from './hooks/useRemovePasswordTimeout';
import { hasPrefixSuffix } from './utils';
export function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return String(value);
}
export function resolveOnChange(target, e, onChange, targetValue) {
  if (!onChange) {
    return;
  }
  var event = e;
  if (e.type === 'click') {
    // Clone a new target for event.
    // Avoid the following usage, the setQuery method gets the original value.
    //
    // const [query, setQuery] = React.useState('');
    // <Input
    //   allowClear
    //   value={query}
    //   onChange={(e)=> {
    //     setQuery((prevStatus) => e.target.value);
    //   }}
    // />
    var currentTarget = target.cloneNode(true);
    // click clear icon
    event = Object.create(e, {
      target: {
        value: currentTarget
      },
      currentTarget: {
        value: currentTarget
      }
    });
    currentTarget.value = '';
    onChange(event);
    return;
  }
  // Trigger by composition event, this means we need force change the input value
  if (targetValue !== undefined) {
    event = Object.create(e, {
      target: {
        value: target
      },
      currentTarget: {
        value: target
      }
    });
    target.value = targetValue;
    onChange(event);
    return;
  }
  onChange(event);
}
export function triggerFocus(element, option) {
  if (!element) {
    return;
  }
  element.focus(option);
  // Selection content
  var _ref = option || {},
    cursor = _ref.cursor;
  if (cursor) {
    var len = element.value.length;
    switch (cursor) {
      case 'start':
        element.setSelectionRange(0, 0);
        break;
      case 'end':
        element.setSelectionRange(len, len);
        break;
      default:
        element.setSelectionRange(0, len);
        break;
    }
  }
}
var Input = /*#__PURE__*/forwardRef(function (props, ref) {
  var customizePrefixCls = props.prefixCls,
    _props$bordered = props.bordered,
    bordered = _props$bordered === void 0 ? true : _props$bordered,
    customStatus = props.status,
    customSize = props.size,
    customDisabled = props.disabled,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    suffix = props.suffix,
    allowClear = props.allowClear,
    addonAfter = props.addonAfter,
    addonBefore = props.addonBefore,
    className = props.className,
    onChange = props.onChange,
    rest = __rest(props, ["prefixCls", "bordered", "status", "size", "disabled", "onBlur", "onFocus", "suffix", "allowClear", "addonAfter", "addonBefore", "className", "onChange"]);
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction,
    input = _React$useContext.input;
  var prefixCls = getPrefixCls('input', customizePrefixCls);
  var inputRef = useRef(null);
  // ===================== Compact Item =====================
  var _useCompactItemContex = useCompactItemContext(prefixCls, direction),
    compactSize = _useCompactItemContex.compactSize,
    compactItemClassnames = _useCompactItemContex.compactItemClassnames;
  // ===================== Size =====================
  var size = React.useContext(SizeContext);
  var mergedSize = compactSize || customSize || size;
  // ===================== Disabled =====================
  var disabled = React.useContext(DisabledContext);
  var mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  // ===================== Status =====================
  var _useContext = useContext(FormItemInputContext),
    contextStatus = _useContext.status,
    hasFeedback = _useContext.hasFeedback,
    feedbackIcon = _useContext.feedbackIcon;
  var mergedStatus = getMergedStatus(contextStatus, customStatus);
  // ===================== Focus warning =====================
  var inputHasPrefixSuffix = hasPrefixSuffix(props) || !!hasFeedback;
  var prevHasPrefixSuffix = useRef(inputHasPrefixSuffix);
  useEffect(function () {
    var _a;
    if (inputHasPrefixSuffix && !prevHasPrefixSuffix.current) {
      process.env.NODE_ENV !== "production" ? warning(document.activeElement === ((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.input), 'Input', "When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ") : void 0;
    }
    prevHasPrefixSuffix.current = inputHasPrefixSuffix;
  }, [inputHasPrefixSuffix]);
  // ===================== Remove Password value =====================
  var removePasswordTimeout = useRemovePasswordTimeout(inputRef, true);
  var handleBlur = function handleBlur(e) {
    removePasswordTimeout();
    onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
  };
  var handleFocus = function handleFocus(e) {
    removePasswordTimeout();
    onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
  };
  var handleChange = function handleChange(e) {
    removePasswordTimeout();
    onChange === null || onChange === void 0 ? void 0 : onChange(e);
  };
  var suffixNode = (hasFeedback || suffix) && ( /*#__PURE__*/React.createElement(React.Fragment, null, suffix, hasFeedback && feedbackIcon));
  // Allow clear
  var mergedAllowClear;
  if (_typeof(allowClear) === 'object' && (allowClear === null || allowClear === void 0 ? void 0 : allowClear.clearIcon)) {
    mergedAllowClear = allowClear;
  } else if (allowClear) {
    mergedAllowClear = {
      clearIcon: /*#__PURE__*/React.createElement(CloseCircleFilled, null)
    };
  }
  return /*#__PURE__*/React.createElement(RcInput, _extends({
    ref: composeRef(ref, inputRef),
    prefixCls: prefixCls,
    autoComplete: input === null || input === void 0 ? void 0 : input.autoComplete
  }, rest, {
    disabled: mergedDisabled || undefined,
    onBlur: handleBlur,
    onFocus: handleFocus,
    suffix: suffixNode,
    allowClear: mergedAllowClear,
    className: classNames(className, compactItemClassnames),
    onChange: handleChange,
    addonAfter: addonAfter && ( /*#__PURE__*/React.createElement(NoCompactStyle, null, /*#__PURE__*/React.createElement(NoFormStyle, {
      override: true,
      status: true
    }, addonAfter))),
    addonBefore: addonBefore && ( /*#__PURE__*/React.createElement(NoCompactStyle, null, /*#__PURE__*/React.createElement(NoFormStyle, {
      override: true,
      status: true
    }, addonBefore))),
    inputClassName: classNames(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-sm"), mergedSize === 'small'), "".concat(prefixCls, "-lg"), mergedSize === 'large'), "".concat(prefixCls, "-rtl"), direction === 'rtl'), "".concat(prefixCls, "-borderless"), !bordered), !inputHasPrefixSuffix && getStatusClassNames(prefixCls, mergedStatus)),
    affixWrapperClassName: classNames(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-affix-wrapper-sm"), mergedSize === 'small'), "".concat(prefixCls, "-affix-wrapper-lg"), mergedSize === 'large'), "".concat(prefixCls, "-affix-wrapper-rtl"), direction === 'rtl'), "".concat(prefixCls, "-affix-wrapper-borderless"), !bordered), getStatusClassNames("".concat(prefixCls, "-affix-wrapper"), mergedStatus, hasFeedback)),
    wrapperClassName: classNames(_defineProperty({}, "".concat(prefixCls, "-group-rtl"), direction === 'rtl')),
    groupClassName: classNames(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-group-wrapper-sm"), mergedSize === 'small'), "".concat(prefixCls, "-group-wrapper-lg"), mergedSize === 'large'), "".concat(prefixCls, "-group-wrapper-rtl"), direction === 'rtl'), getStatusClassNames("".concat(prefixCls, "-group-wrapper"), mergedStatus, hasFeedback))
  }));
});
export default Input;