import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import classNames from 'classnames';
import { tuple } from './type';
var InputStatuses = tuple('warning', 'error', '');
export function getStatusClassNames(prefixCls, status, hasFeedback) {
  return classNames(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-status-success"), status === 'success'), "".concat(prefixCls, "-status-warning"), status === 'warning'), "".concat(prefixCls, "-status-error"), status === 'error'), "".concat(prefixCls, "-status-validating"), status === 'validating'), "".concat(prefixCls, "-has-feedback"), hasFeedback));
}
export var getMergedStatus = function getMergedStatus(contextStatus, customStatus) {
  return customStatus || contextStatus;
};