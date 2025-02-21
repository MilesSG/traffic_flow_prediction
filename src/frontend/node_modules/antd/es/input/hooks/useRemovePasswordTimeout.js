import { useEffect, useRef } from 'react';
export default function useRemovePasswordTimeout(inputRef, triggerOnMount) {
  var removePasswordTimeoutRef = useRef([]);
  var removePasswordTimeout = function removePasswordTimeout() {
    removePasswordTimeoutRef.current.push(setTimeout(function () {
      var _a, _b, _c, _d;
      if (((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.input) && ((_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.input.getAttribute('type')) === 'password' && ((_c = inputRef.current) === null || _c === void 0 ? void 0 : _c.input.hasAttribute('value'))) {
        (_d = inputRef.current) === null || _d === void 0 ? void 0 : _d.input.removeAttribute('value');
      }
    }));
  };
  useEffect(function () {
    if (triggerOnMount) {
      removePasswordTimeout();
    }
    return function () {
      return removePasswordTimeoutRef.current.forEach(function (timer) {
        if (timer) {
          clearTimeout(timer);
        }
      });
    };
  }, []);
  return removePasswordTimeout;
}