"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMergedStatus = void 0;
exports.getStatusClassNames = getStatusClassNames;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classnames = _interopRequireDefault(require("classnames"));
var _type = require("./type");
var InputStatuses = (0, _type.tuple)('warning', 'error', '');
function getStatusClassNames(prefixCls, status, hasFeedback) {
  return (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-status-success"), status === 'success'), "".concat(prefixCls, "-status-warning"), status === 'warning'), "".concat(prefixCls, "-status-error"), status === 'error'), "".concat(prefixCls, "-status-validating"), status === 'validating'), "".concat(prefixCls, "-has-feedback"), hasFeedback));
}
var getMergedStatus = exports.getMergedStatus = function getMergedStatus(contextStatus, customStatus) {
  return customStatus || contextStatus;
};