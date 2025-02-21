import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import classNames from 'classnames';
import * as React from 'react';
import { withConfigConsumer } from '../config-provider/context';
import Skeleton from '../skeleton';
import StatisticNumber from './Number';
var Statistic = function Statistic(props) {
  var prefixCls = props.prefixCls,
    className = props.className,
    style = props.style,
    valueStyle = props.valueStyle,
    _props$value = props.value,
    value = _props$value === void 0 ? 0 : _props$value,
    title = props.title,
    valueRender = props.valueRender,
    prefix = props.prefix,
    suffix = props.suffix,
    _props$loading = props.loading,
    loading = _props$loading === void 0 ? false : _props$loading,
    direction = props.direction,
    onMouseEnter = props.onMouseEnter,
    onMouseLeave = props.onMouseLeave,
    _props$decimalSeparat = props.decimalSeparator,
    decimalSeparator = _props$decimalSeparat === void 0 ? '.' : _props$decimalSeparat,
    _props$groupSeparator = props.groupSeparator,
    groupSeparator = _props$groupSeparator === void 0 ? ',' : _props$groupSeparator;
  var valueNode = /*#__PURE__*/React.createElement(StatisticNumber, _extends({
    decimalSeparator: decimalSeparator,
    groupSeparator: groupSeparator
  }, props, {
    value: value
  }));
  var cls = classNames(prefixCls, _defineProperty({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: style,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-title")
  }, title), /*#__PURE__*/React.createElement(Skeleton, {
    paragraph: false,
    loading: loading,
    className: "".concat(prefixCls, "-skeleton")
  }, /*#__PURE__*/React.createElement("div", {
    style: valueStyle,
    className: "".concat(prefixCls, "-content")
  }, prefix && /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-content-prefix")
  }, prefix), valueRender ? valueRender(valueNode) : valueNode, suffix && /*#__PURE__*/React.createElement("span", {
    className: "".concat(prefixCls, "-content-suffix")
  }, suffix))));
};
var WrapperStatistic = withConfigConsumer({
  prefixCls: 'statistic'
})(Statistic);
export default WrapperStatistic;