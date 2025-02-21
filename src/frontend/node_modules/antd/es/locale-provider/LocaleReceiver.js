import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import LocaleContext from './context';
import defaultLocaleData from './default';
var LocaleReceiver = function LocaleReceiver(props) {
  var _props$componentName = props.componentName,
    componentName = _props$componentName === void 0 ? 'global' : _props$componentName,
    defaultLocale = props.defaultLocale,
    children = props.children;
  var antLocale = React.useContext(LocaleContext);
  var getLocale = React.useMemo(function () {
    var _a;
    var locale = defaultLocale || defaultLocaleData[componentName];
    var localeFromContext = (_a = antLocale === null || antLocale === void 0 ? void 0 : antLocale[componentName]) !== null && _a !== void 0 ? _a : {};
    return _extends(_extends({}, locale instanceof Function ? locale() : locale), localeFromContext || {});
  }, [componentName, defaultLocale, antLocale]);
  var getLocaleCode = React.useMemo(function () {
    var localeCode = antLocale && antLocale.locale;
    // Had use LocaleProvide but didn't set locale
    if (antLocale && antLocale.exist && !localeCode) {
      return defaultLocaleData.locale;
    }
    return localeCode;
  }, [antLocale]);
  return children(getLocale, getLocaleCode, antLocale);
};
export default LocaleReceiver;
export var useLocaleReceiver = function useLocaleReceiver(componentName, defaultLocale) {
  var antLocale = React.useContext(LocaleContext);
  var getLocale = React.useMemo(function () {
    var _a;
    var locale = defaultLocale || defaultLocaleData[componentName];
    var localeFromContext = (_a = antLocale === null || antLocale === void 0 ? void 0 : antLocale[componentName]) !== null && _a !== void 0 ? _a : {};
    return _extends(_extends({}, typeof locale === 'function' ? locale() : locale), localeFromContext || {});
  }, [componentName, defaultLocale, antLocale]);
  return [getLocale];
};