"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ConfigConsumer", {
  enumerable: true,
  get: function get() {
    return _context.ConfigConsumer;
  }
});
Object.defineProperty(exports, "ConfigContext", {
  enumerable: true,
  get: function get() {
    return _context.ConfigContext;
  }
});
exports.globalConfig = exports.defaultPrefixCls = exports.defaultIconPrefixCls = exports["default"] = exports.configConsumerProps = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _Context = _interopRequireDefault(require("@ant-design/icons/lib/components/Context"));
var _useMemo = _interopRequireDefault(require("rc-util/lib/hooks/useMemo"));
var React = _interopRequireWildcard(require("react"));
var _set = require("rc-util/lib/utils/set");
var _validateMessagesContext = _interopRequireDefault(require("../form/validateMessagesContext"));
var _localeProvider = _interopRequireWildcard(require("../locale-provider"));
var _LocaleReceiver = _interopRequireDefault(require("../locale-provider/LocaleReceiver"));
var _default2 = _interopRequireDefault(require("../locale/default"));
var _message = _interopRequireDefault(require("../message"));
var _notification = _interopRequireDefault(require("../notification"));
var _context = require("./context");
var _cssVariables = require("./cssVariables");
var _DisabledContext = require("./DisabledContext");
var _SizeContext = _interopRequireWildcard(require("./SizeContext"));
var configConsumerProps = exports.configConsumerProps = ['getTargetContainer', 'getPopupContainer', 'rootPrefixCls', 'getPrefixCls', 'renderEmpty', 'csp', 'autoInsertSpaceInButton', 'locale', 'pageHeader'];
// These props is used by `useContext` directly in sub component
var PASSED_PROPS = ['getTargetContainer', 'getPopupContainer', 'renderEmpty', 'pageHeader', 'input', 'pagination', 'form'];
var defaultPrefixCls = exports.defaultPrefixCls = 'ant';
var defaultIconPrefixCls = exports.defaultIconPrefixCls = 'anticon';
var globalPrefixCls;
var globalIconPrefixCls;
function getGlobalPrefixCls() {
  return globalPrefixCls || defaultPrefixCls;
}
function getGlobalIconPrefixCls() {
  return globalIconPrefixCls || defaultIconPrefixCls;
}
var setGlobalConfig = function setGlobalConfig(_ref) {
  var prefixCls = _ref.prefixCls,
    iconPrefixCls = _ref.iconPrefixCls,
    theme = _ref.theme;
  if (prefixCls !== undefined) {
    globalPrefixCls = prefixCls;
  }
  if (iconPrefixCls !== undefined) {
    globalIconPrefixCls = iconPrefixCls;
  }
  if (theme) {
    (0, _cssVariables.registerTheme)(getGlobalPrefixCls(), theme);
  }
};
var globalConfig = exports.globalConfig = function globalConfig() {
  return {
    getPrefixCls: function getPrefixCls(suffixCls, customizePrefixCls) {
      if (customizePrefixCls) return customizePrefixCls;
      return suffixCls ? "".concat(getGlobalPrefixCls(), "-").concat(suffixCls) : getGlobalPrefixCls();
    },
    getIconPrefixCls: getGlobalIconPrefixCls,
    getRootPrefixCls: function getRootPrefixCls(rootPrefixCls, customizePrefixCls) {
      // Customize rootPrefixCls is first priority
      if (rootPrefixCls) {
        return rootPrefixCls;
      }
      // If Global prefixCls provided, use this
      if (globalPrefixCls) {
        return globalPrefixCls;
      }
      // [Legacy] If customize prefixCls provided, we cut it to get the prefixCls
      if (customizePrefixCls && customizePrefixCls.includes('-')) {
        return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1');
      }
      // Fallback to default prefixCls
      return getGlobalPrefixCls();
    }
  };
};
var ProviderChildren = function ProviderChildren(props) {
  var children = props.children,
    csp = props.csp,
    autoInsertSpaceInButton = props.autoInsertSpaceInButton,
    form = props.form,
    locale = props.locale,
    componentSize = props.componentSize,
    direction = props.direction,
    space = props.space,
    virtual = props.virtual,
    dropdownMatchSelectWidth = props.dropdownMatchSelectWidth,
    legacyLocale = props.legacyLocale,
    parentContext = props.parentContext,
    iconPrefixCls = props.iconPrefixCls,
    componentDisabled = props.componentDisabled;
  var getPrefixCls = React.useCallback(function (suffixCls, customizePrefixCls) {
    var prefixCls = props.prefixCls;
    if (customizePrefixCls) return customizePrefixCls;
    var mergedPrefixCls = prefixCls || parentContext.getPrefixCls('');
    return suffixCls ? "".concat(mergedPrefixCls, "-").concat(suffixCls) : mergedPrefixCls;
  }, [parentContext.getPrefixCls, props.prefixCls]);
  var config = (0, _extends2["default"])((0, _extends2["default"])({}, parentContext), {
    csp: csp,
    autoInsertSpaceInButton: autoInsertSpaceInButton,
    locale: locale || legacyLocale,
    direction: direction,
    space: space,
    virtual: virtual,
    dropdownMatchSelectWidth: dropdownMatchSelectWidth,
    getPrefixCls: getPrefixCls
  });
  // Pass the props used by `useContext` directly with child component.
  // These props should merged into `config`.
  PASSED_PROPS.forEach(function (propName) {
    var propValue = props[propName];
    if (propValue) {
      config[propName] = propValue;
    }
  });
  // https://github.com/ant-design/ant-design/issues/27617
  var memoedConfig = (0, _useMemo["default"])(function () {
    return config;
  }, config, function (prevConfig, currentConfig) {
    var prevKeys = Object.keys(prevConfig);
    var currentKeys = Object.keys(currentConfig);
    return prevKeys.length !== currentKeys.length || prevKeys.some(function (key) {
      return prevConfig[key] !== currentConfig[key];
    });
  });
  var memoIconContextValue = React.useMemo(function () {
    return {
      prefixCls: iconPrefixCls,
      csp: csp
    };
  }, [iconPrefixCls, csp]);
  var childNode = children;
  var validateMessages = React.useMemo(function () {
    var _a, _b, _c, _d;
    return (0, _set.merge)(((_a = _default2["default"].Form) === null || _a === void 0 ? void 0 : _a.defaultValidateMessages) || {}, ((_c = (_b = memoedConfig.locale) === null || _b === void 0 ? void 0 : _b.Form) === null || _c === void 0 ? void 0 : _c.defaultValidateMessages) || {}, ((_d = memoedConfig.form) === null || _d === void 0 ? void 0 : _d.validateMessages) || {}, (form === null || form === void 0 ? void 0 : form.validateMessages) || {});
  }, [memoedConfig, form === null || form === void 0 ? void 0 : form.validateMessages]);
  if (Object.keys(validateMessages).length > 0) {
    childNode = /*#__PURE__*/React.createElement(_validateMessagesContext["default"].Provider, {
      value: validateMessages
    }, children);
  }
  if (locale) {
    childNode = /*#__PURE__*/React.createElement(_localeProvider["default"], {
      locale: locale,
      _ANT_MARK__: _localeProvider.ANT_MARK
    }, childNode);
  }
  if (iconPrefixCls || csp) {
    childNode = /*#__PURE__*/React.createElement(_Context["default"].Provider, {
      value: memoIconContextValue
    }, childNode);
  }
  if (componentSize) {
    childNode = /*#__PURE__*/React.createElement(_SizeContext.SizeContextProvider, {
      size: componentSize
    }, childNode);
  }
  if (componentDisabled !== undefined) {
    childNode = /*#__PURE__*/React.createElement(_DisabledContext.DisabledContextProvider, {
      disabled: componentDisabled
    }, childNode);
  }
  return /*#__PURE__*/React.createElement(_context.ConfigContext.Provider, {
    value: memoedConfig
  }, childNode);
};
var ConfigProvider = function ConfigProvider(props) {
  React.useEffect(function () {
    if (props.direction) {
      _message["default"].config({
        rtl: props.direction === 'rtl'
      });
      _notification["default"].config({
        rtl: props.direction === 'rtl'
      });
    }
  }, [props.direction]);
  return /*#__PURE__*/React.createElement(_LocaleReceiver["default"], null, function (_, __, legacyLocale) {
    return /*#__PURE__*/React.createElement(_context.ConfigConsumer, null, function (context) {
      return /*#__PURE__*/React.createElement(ProviderChildren, (0, _extends2["default"])({
        parentContext: context,
        legacyLocale: legacyLocale
      }, props));
    });
  });
};
/** @private internal Usage. do not use in your production */
ConfigProvider.ConfigContext = _context.ConfigContext;
ConfigProvider.SizeContext = _SizeContext["default"];
ConfigProvider.config = setGlobalConfig;
var _default = exports["default"] = ConfigProvider;