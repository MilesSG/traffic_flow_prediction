"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = createContext;
exports.useContextSelector = useContextSelector;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _useLayoutEffect = _interopRequireDefault(require("rc-util/lib/hooks/useLayoutEffect"));

var _useEvent = _interopRequireDefault(require("rc-util/lib/hooks/useEvent"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function createContext() {
  var Context = /*#__PURE__*/React.createContext(null);

  var Provider = function Provider(_ref) {
    var value = _ref.value,
        children = _ref.children;
    var valueRef = React.useRef(value);
    valueRef.current = value;

    var _React$useState = React.useState(function () {
      return {
        getValue: function getValue() {
          return valueRef.current;
        },
        listeners: new Set()
      };
    }),
        _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 1),
        context = _React$useState2[0];

    (0, _useLayoutEffect.default)(function () {
      context.listeners.forEach(function (listener) {
        listener(value);
      });
    }, [value]);
    return /*#__PURE__*/React.createElement(Context.Provider, {
      value: context
    }, children);
  };

  return {
    Context: Context,
    Provider: Provider
  };
}

function useContextSelector(holder, selector) {
  var eventSelector = (0, _useEvent.default)(selector);
  var context = React.useContext(holder === null || holder === void 0 ? void 0 : holder.Context);

  var _ref2 = context || {},
      listeners = _ref2.listeners,
      getValue = _ref2.getValue;

  var _React$useState3 = React.useState(function () {
    return eventSelector(context ? getValue() : null);
  }),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      value = _React$useState4[0],
      setValue = _React$useState4[1];

  (0, _useLayoutEffect.default)(function () {
    if (!context) {
      return;
    }

    function trigger(nextValue) {
      setValue(function (prev) {
        var selectedValue = eventSelector(nextValue);
        return (0, _shallowequal.default)(prev, selectedValue) ? prev : selectedValue;
      });
    }

    listeners.add(trigger);
    return function () {
      listeners.delete(trigger);
    };
  }, [context]);
  return value;
}