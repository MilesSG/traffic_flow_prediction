"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ANT_MARK = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _warning = _interopRequireDefault(require("../_util/warning"));
var _locale = require("../modal/locale");
var _context = _interopRequireDefault(require("./context"));
var ANT_MARK = exports.ANT_MARK = 'internalMark';
var LocaleProvider = function LocaleProvider(props) {
  var _props$locale = props.locale,
    locale = _props$locale === void 0 ? {} : _props$locale,
    children = props.children,
    _ANT_MARK__ = props._ANT_MARK__;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? (0, _warning["default"])(_ANT_MARK__ === ANT_MARK, 'LocaleProvider', '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale') : void 0;
  }
  React.useEffect(function () {
    (0, _locale.changeConfirmLocale)(locale && locale.Modal);
    return function () {
      (0, _locale.changeConfirmLocale)();
    };
  }, [locale]);
  var getMemoizedContextValue = React.useMemo(function () {
    return (0, _extends2["default"])((0, _extends2["default"])({}, locale), {
      exist: true
    });
  }, [locale]);
  return /*#__PURE__*/React.createElement(_context["default"].Provider, {
    value: getMemoizedContextValue
  }, children);
};
var _default = exports["default"] = LocaleProvider;