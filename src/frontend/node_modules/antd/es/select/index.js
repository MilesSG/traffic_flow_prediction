import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
// TODO: 4.0 - codemod should help to change `filterOption` to support node props.
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import classNames from 'classnames';
import RcSelect, { OptGroup, Option } from 'rc-select';
import omit from "rc-util/es/omit";
import * as React from 'react';
import { useContext } from 'react';
import { ConfigContext } from '../config-provider';
import defaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import DisabledContext from '../config-provider/DisabledContext';
import SizeContext from '../config-provider/SizeContext';
import { FormItemInputContext } from '../form/context';
import { getTransitionDirection, getTransitionName } from '../_util/motion';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import getIcons from './utils/iconUtil';
import warning from '../_util/warning';
import { useCompactItemContext } from '../space/Compact';
var SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
var InternalSelect = function InternalSelect(_a, ref) {
  var customizePrefixCls = _a.prefixCls,
    _a$bordered = _a.bordered,
    bordered = _a$bordered === void 0 ? true : _a$bordered,
    className = _a.className,
    getPopupContainer = _a.getPopupContainer,
    dropdownClassName = _a.dropdownClassName,
    popupClassName = _a.popupClassName,
    _a$listHeight = _a.listHeight,
    listHeight = _a$listHeight === void 0 ? 256 : _a$listHeight,
    placement = _a.placement,
    _a$listItemHeight = _a.listItemHeight,
    listItemHeight = _a$listItemHeight === void 0 ? 32 : _a$listItemHeight,
    customizeSize = _a.size,
    customDisabled = _a.disabled,
    notFoundContent = _a.notFoundContent,
    customStatus = _a.status,
    showArrow = _a.showArrow,
    props = __rest(_a, ["prefixCls", "bordered", "className", "getPopupContainer", "dropdownClassName", "popupClassName", "listHeight", "placement", "listItemHeight", "size", "disabled", "notFoundContent", "status", "showArrow"]);
  var _React$useContext = React.useContext(ConfigContext),
    getContextPopupContainer = _React$useContext.getPopupContainer,
    getPrefixCls = _React$useContext.getPrefixCls,
    renderEmpty = _React$useContext.renderEmpty,
    direction = _React$useContext.direction,
    virtual = _React$useContext.virtual,
    dropdownMatchSelectWidth = _React$useContext.dropdownMatchSelectWidth;
  var size = React.useContext(SizeContext);
  var prefixCls = getPrefixCls('select', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();
  var _useCompactItemContex = useCompactItemContext(prefixCls, direction),
    compactSize = _useCompactItemContex.compactSize,
    compactItemClassnames = _useCompactItemContex.compactItemClassnames;
  var mode = React.useMemo(function () {
    var m = props.mode;
    if (m === 'combobox') {
      return undefined;
    }
    if (m === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox';
    }
    return m;
  }, [props.mode]);
  var isMultiple = mode === 'multiple' || mode === 'tags';
  var mergedShowArrow = showArrow !== undefined ? showArrow : props.loading || !(isMultiple || mode === 'combobox');
  // =================== Warning =====================
  process.env.NODE_ENV !== "production" ? warning(!dropdownClassName, 'Select', '`dropdownClassName` is deprecated which will be removed in next major version. Please use `popupClassName` instead.') : void 0;
  // ===================== Form Status =====================
  var _useContext = useContext(FormItemInputContext),
    contextStatus = _useContext.status,
    hasFeedback = _useContext.hasFeedback,
    isFormItemInput = _useContext.isFormItemInput,
    feedbackIcon = _useContext.feedbackIcon;
  var mergedStatus = getMergedStatus(contextStatus, customStatus);
  // ===================== Empty =====================
  var mergedNotFound;
  if (notFoundContent !== undefined) {
    mergedNotFound = notFoundContent;
  } else if (mode === 'combobox') {
    mergedNotFound = null;
  } else {
    mergedNotFound = (renderEmpty || defaultRenderEmpty)('Select');
  }
  // ===================== Icons =====================
  var _getIcons = getIcons(_extends(_extends({}, props), {
      multiple: isMultiple,
      hasFeedback: hasFeedback,
      feedbackIcon: feedbackIcon,
      showArrow: mergedShowArrow,
      prefixCls: prefixCls
    })),
    suffixIcon = _getIcons.suffixIcon,
    itemIcon = _getIcons.itemIcon,
    removeIcon = _getIcons.removeIcon,
    clearIcon = _getIcons.clearIcon;
  var selectProps = omit(props, ['suffixIcon', 'itemIcon']);
  var rcSelectRtlDropdownClassName = classNames(popupClassName || dropdownClassName, _defineProperty({}, "".concat(prefixCls, "-dropdown-").concat(direction), direction === 'rtl'));
  var mergedSize = compactSize || customizeSize || size;
  // ===================== Disabled =====================
  var disabled = React.useContext(DisabledContext);
  var mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  var mergedClassName = classNames(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-lg"), mergedSize === 'large'), "".concat(prefixCls, "-sm"), mergedSize === 'small'), "".concat(prefixCls, "-rtl"), direction === 'rtl'), "".concat(prefixCls, "-borderless"), !bordered), "".concat(prefixCls, "-in-form-item"), isFormItemInput), getStatusClassNames(prefixCls, mergedStatus, hasFeedback), compactItemClassnames, className);
  // ===================== Placement =====================
  var getPlacement = function getPlacement() {
    if (placement !== undefined) {
      return placement;
    }
    return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  };
  return /*#__PURE__*/React.createElement(RcSelect, _extends({
    ref: ref,
    virtual: virtual,
    dropdownMatchSelectWidth: dropdownMatchSelectWidth
  }, selectProps, {
    transitionName: getTransitionName(rootPrefixCls, getTransitionDirection(placement), props.transitionName),
    listHeight: listHeight,
    listItemHeight: listItemHeight,
    mode: mode,
    prefixCls: prefixCls,
    placement: getPlacement(),
    direction: direction,
    inputIcon: suffixIcon,
    menuItemSelectedIcon: itemIcon,
    removeIcon: removeIcon,
    clearIcon: clearIcon,
    notFoundContent: mergedNotFound,
    className: mergedClassName,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    dropdownClassName: rcSelectRtlDropdownClassName,
    showArrow: hasFeedback || showArrow,
    disabled: mergedDisabled
  }));
};
var Select = /*#__PURE__*/React.forwardRef(InternalSelect);
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = Option;
Select.OptGroup = OptGroup;
export default Select;