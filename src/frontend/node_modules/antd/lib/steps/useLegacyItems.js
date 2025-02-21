"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useLegacyItems;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));
var _warning = _interopRequireDefault(require("../_util/warning"));
function filter(items) {
  return items.filter(function (item) {
    return item;
  });
}
function useLegacyItems(items, children) {
  if (items) {
    return items;
  }
  process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!children, 'Steps', 'Step is deprecated. Please use `items` directly.') : void 0;
  var childrenItems = (0, _toArray["default"])(children).map(function (node) {
    if ( /*#__PURE__*/React.isValidElement(node)) {
      var props = node.props;
      var item = (0, _extends2["default"])({}, props);
      return item;
    }
    return null;
  });
  return filter(childrenItems);
}