import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import useForceUpdate from '../_util/hooks/useForceUpdate';
import { cloneElement } from '../_util/reactNode';
import Statistic from './Statistic';
import { formatCountdown } from './utils';
var REFRESH_INTERVAL = 1000 / 30;
function getTime(value) {
  return new Date(value).getTime();
}
var Countdown = function Countdown(props) {
  var value = props.value,
    _props$format = props.format,
    format = _props$format === void 0 ? 'HH:mm:ss' : _props$format,
    onChange = props.onChange,
    onFinish = props.onFinish;
  var forceUpdate = useForceUpdate();
  var countdown = React.useRef(null);
  var stopTimer = function stopTimer() {
    onFinish === null || onFinish === void 0 ? void 0 : onFinish();
    if (countdown.current) {
      clearInterval(countdown.current);
      countdown.current = null;
    }
  };
  var syncTimer = function syncTimer() {
    var timestamp = getTime(value);
    if (timestamp >= Date.now()) {
      countdown.current = setInterval(function () {
        forceUpdate();
        onChange === null || onChange === void 0 ? void 0 : onChange(timestamp - Date.now());
        if (timestamp < Date.now()) {
          stopTimer();
        }
      }, REFRESH_INTERVAL);
    }
  };
  React.useEffect(function () {
    syncTimer();
    return function () {
      if (countdown.current) {
        clearInterval(countdown.current);
        countdown.current = null;
      }
    };
  }, [value]);
  var formatter = function formatter(formatValue, config) {
    return formatCountdown(formatValue, _extends(_extends({}, config), {
      format: format
    }));
  };
  var valueRender = function valueRender(node) {
    return cloneElement(node, {
      title: undefined
    });
  };
  return /*#__PURE__*/React.createElement(Statistic, _extends({}, props, {
    valueRender: valueRender,
    formatter: formatter
  }));
};
export default /*#__PURE__*/React.memo(Countdown);