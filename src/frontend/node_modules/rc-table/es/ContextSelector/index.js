import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import useLayoutEffect from "rc-util/es/hooks/useLayoutEffect";
import useEvent from "rc-util/es/hooks/useEvent";
import shallowEqual from 'shallowequal';
export function createContext() {
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
        _React$useState2 = _slicedToArray(_React$useState, 1),
        context = _React$useState2[0];

    useLayoutEffect(function () {
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
export function useContextSelector(holder, selector) {
  var eventSelector = useEvent(selector);
  var context = React.useContext(holder === null || holder === void 0 ? void 0 : holder.Context);

  var _ref2 = context || {},
      listeners = _ref2.listeners,
      getValue = _ref2.getValue;

  var _React$useState3 = React.useState(function () {
    return eventSelector(context ? getValue() : null);
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      value = _React$useState4[0],
      setValue = _React$useState4[1];

  useLayoutEffect(function () {
    if (!context) {
      return;
    }

    function trigger(nextValue) {
      setValue(function (prev) {
        var selectedValue = eventSelector(nextValue);
        return shallowEqual(prev, selectedValue) ? prev : selectedValue;
      });
    }

    listeners.add(trigger);
    return function () {
      listeners.delete(trigger);
    };
  }, [context]);
  return value;
}