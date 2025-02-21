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
var _warning = _interopRequireDefault(require("../../_util/warning"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function filter(items) {
  return items.filter(function (item) {
    return item;
  });
}
function useLegacyItems(items, children) {
  if (items) {
    return items;
  }
  process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!children, 'Tabs', 'Tabs.TabPane is deprecated. Please use `items` directly.') : void 0;
  var childrenItems = (0, _toArray["default"])(children).map(function (node) {
    if ( /*#__PURE__*/React.isValidElement(node)) {
      var key = node.key,
        props = node.props;
      var _a = props || {},
        tab = _a.tab,
        restProps = __rest(_a, ["tab"]);
      var item = (0, _extends2["default"])((0, _extends2["default"])({
        key: String(key)
      }, restProps), {
        label: tab
      });
      return item;
    }
    return null;
  });
  return filter(childrenItems);
}