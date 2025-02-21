"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoStyleItemContext = exports.NoFormStyle = exports.FormProvider = exports.FormItemPrefixContext = exports.FormItemInputContext = exports.FormContext = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _rcFieldForm = require("rc-field-form");
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var FormContext = exports.FormContext = /*#__PURE__*/React.createContext({
  labelAlign: 'right',
  vertical: false,
  itemRef: function itemRef() {}
});
var NoStyleItemContext = exports.NoStyleItemContext = /*#__PURE__*/React.createContext(null);
var FormProvider = exports.FormProvider = function FormProvider(props) {
  var providerProps = (0, _omit["default"])(props, ['prefixCls']);
  return /*#__PURE__*/React.createElement(_rcFieldForm.FormProvider, (0, _extends2["default"])({}, providerProps));
};
var FormItemPrefixContext = exports.FormItemPrefixContext = /*#__PURE__*/React.createContext({
  prefixCls: ''
});
var FormItemInputContext = exports.FormItemInputContext = /*#__PURE__*/React.createContext({});
var NoFormStyle = exports.NoFormStyle = function NoFormStyle(_ref) {
  var children = _ref.children,
    status = _ref.status,
    override = _ref.override;
  var formItemInputContext = (0, _react.useContext)(FormItemInputContext);
  var newFormItemInputContext = (0, _react.useMemo)(function () {
    var newContext = (0, _extends2["default"])({}, formItemInputContext);
    if (override) {
      delete newContext.isFormItemInput;
    }
    if (status) {
      delete newContext.status;
      delete newContext.hasFeedback;
      delete newContext.feedbackIcon;
    }
    return newContext;
  }, [status, override, formItemInputContext]);
  return /*#__PURE__*/React.createElement(FormItemInputContext.Provider, {
    value: newFormItemInputContext
  }, children);
};