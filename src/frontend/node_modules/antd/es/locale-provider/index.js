import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import warning from '../_util/warning';
import { changeConfirmLocale } from '../modal/locale';
import LocaleContext from './context';
export var ANT_MARK = 'internalMark';
var LocaleProvider = function LocaleProvider(props) {
  var _props$locale = props.locale,
    locale = _props$locale === void 0 ? {} : _props$locale,
    children = props.children,
    _ANT_MARK__ = props._ANT_MARK__;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? warning(_ANT_MARK__ === ANT_MARK, 'LocaleProvider', '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale') : void 0;
  }
  React.useEffect(function () {
    changeConfirmLocale(locale && locale.Modal);
    return function () {
      changeConfirmLocale();
    };
  }, [locale]);
  var getMemoizedContextValue = React.useMemo(function () {
    return _extends(_extends({}, locale), {
      exist: true
    });
  }, [locale]);
  return /*#__PURE__*/React.createElement(LocaleContext.Provider, {
    value: getMemoizedContextValue
  }, children);
};
export default LocaleProvider;