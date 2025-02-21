"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLocaleReceiver = exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _context = _interopRequireDefault(require("./context"));
var _default2 = _interopRequireDefault(require("./default"));
var LocaleReceiver = function LocaleReceiver(props) {
  var _props$componentName = props.componentName,
    componentName = _props$componentName === void 0 ? 'global' : _props$componentName,
    defaultLocale = props.defaultLocale,
    children = props.children;
  var antLocale = React.useContext(_context["default"]);
  var getLocale = React.useMemo(function () {
    var _a;
    var locale = defaultLocale || _default2["default"][componentName];
    var localeFromContext = (_a = antLocale === null || antLocale === void 0 ? void 0 : antLocale[componentName]) !== null && _a !== void 0 ? _a : {};
    return (0, _extends2["default"])((0, _extends2["default"])({}, locale instanceof Function ? locale() : locale), localeFromContext || {});
  }, [componentName, defaultLocale, antLocale]);
  var getLocaleCode = React.useMemo(function () {
    var localeCode = antLocale && antLocale.locale;
    // Had use LocaleProvide but didn't set locale
    if (antLocale && antLocale.exist && !localeCode) {
      return _default2["default"].locale;
    }
    return localeCode;
  }, [antLocale]);
  return children(getLocale, getLocaleCode, antLocale);
};
var _default = exports["default"] = LocaleReceiver;
var useLocaleReceiver = exports.useLocaleReceiver = function useLocaleReceiver(componentName, defaultLocale) {
  var antLocale = React.useContext(_context["default"]);
  var getLocale = React.useMemo(function () {
    var _a;
    var locale = defaultLocale || _default2["default"][componentName];
    var localeFromContext = (_a = antLocale === null || antLocale === void 0 ? void 0 : antLocale[componentName]) !== null && _a !== void 0 ? _a : {};
    return (0, _extends2["default"])((0, _extends2["default"])({}, typeof locale === 'function' ? locale() : locale), localeFromContext || {});
  }, [componentName, defaultLocale, antLocale]);
  return [getLocale];
};