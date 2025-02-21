import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _isNativeReflectConstruct from "@babel/runtime/helpers/esm/isNativeReflectConstruct";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import classNames from 'classnames';
import * as React from 'react';
import { FormItemInputContext } from '../form/context';
import { cloneElement } from '../_util/reactNode';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { tuple } from '../_util/type';
var ClearableInputType = tuple('text', 'input');
function hasAddon(props) {
  return !!(props.addonBefore || props.addonAfter);
}
var ClearableLabeledInput = /*#__PURE__*/function (_React$Component) {
  _inherits(ClearableLabeledInput, _React$Component);
  function ClearableLabeledInput() {
    _classCallCheck(this, ClearableLabeledInput);
    return _callSuper(this, ClearableLabeledInput, arguments);
  }
  _createClass(ClearableLabeledInput, [{
    key: "renderClearIcon",
    value: function renderClearIcon(prefixCls) {
      var _this$props = this.props,
        value = _this$props.value,
        disabled = _this$props.disabled,
        readOnly = _this$props.readOnly,
        handleReset = _this$props.handleReset,
        suffix = _this$props.suffix;
      var needClear = !disabled && !readOnly && value;
      var className = "".concat(prefixCls, "-clear-icon");
      return /*#__PURE__*/React.createElement(CloseCircleFilled, {
        onClick: handleReset,
        // Do not trigger onBlur when clear input
        // https://github.com/ant-design/ant-design/issues/31200
        onMouseDown: function onMouseDown(e) {
          return e.preventDefault();
        },
        className: classNames(_defineProperty(_defineProperty({}, "".concat(className, "-hidden"), !needClear), "".concat(className, "-has-suffix"), !!suffix), className),
        role: "button"
      });
    }
  }, {
    key: "renderTextAreaWithClearIcon",
    value: function renderTextAreaWithClearIcon(prefixCls, element, statusContext) {
      var _this$props2 = this.props,
        value = _this$props2.value,
        allowClear = _this$props2.allowClear,
        className = _this$props2.className,
        focused = _this$props2.focused,
        style = _this$props2.style,
        direction = _this$props2.direction,
        bordered = _this$props2.bordered,
        hidden = _this$props2.hidden,
        customStatus = _this$props2.status;
      var contextStatus = statusContext.status,
        hasFeedback = statusContext.hasFeedback;
      if (!allowClear) {
        return cloneElement(element, {
          value: value
        });
      }
      var affixWrapperCls = classNames("".concat(prefixCls, "-affix-wrapper"), "".concat(prefixCls, "-affix-wrapper-textarea-with-clear-btn"), getStatusClassNames("".concat(prefixCls, "-affix-wrapper"), getMergedStatus(contextStatus, customStatus), hasFeedback), _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-affix-wrapper-focused"), focused), "".concat(prefixCls, "-affix-wrapper-rtl"), direction === 'rtl'), "".concat(prefixCls, "-affix-wrapper-borderless"), !bordered), "".concat(className), !hasAddon(this.props) && className));
      return /*#__PURE__*/React.createElement("span", {
        className: affixWrapperCls,
        style: style,
        hidden: hidden
      }, cloneElement(element, {
        style: null,
        value: value
      }), this.renderClearIcon(prefixCls));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      return /*#__PURE__*/React.createElement(FormItemInputContext.Consumer, null, function (statusContext) {
        var _this$props3 = _this.props,
          prefixCls = _this$props3.prefixCls,
          inputType = _this$props3.inputType,
          element = _this$props3.element;
        if (inputType === ClearableInputType[0]) {
          return _this.renderTextAreaWithClearIcon(prefixCls, element, statusContext);
        }
      });
    }
  }]);
  return ClearableLabeledInput;
}(React.Component);
export default ClearableLabeledInput;