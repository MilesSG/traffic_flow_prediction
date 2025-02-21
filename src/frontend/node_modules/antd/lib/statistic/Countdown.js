"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useForceUpdate = _interopRequireDefault(require("../_util/hooks/useForceUpdate"));
var _reactNode = require("../_util/reactNode");
var _Statistic = _interopRequireDefault(require("./Statistic"));
var _utils = require("./utils");
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
  var forceUpdate = (0, _useForceUpdate["default"])();
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
    return (0, _utils.formatCountdown)(formatValue, (0, _extends2["default"])((0, _extends2["default"])({}, config), {
      format: format
    }));
  };
  var valueRender = function valueRender(node) {
    return (0, _reactNode.cloneElement)(node, {
      title: undefined
    });
  };
  return /*#__PURE__*/React.createElement(_Statistic["default"], (0, _extends2["default"])({}, props, {
    valueRender: valueRender,
    formatter: formatter
  }));
};
var _default = exports["default"] = /*#__PURE__*/React.memo(Countdown);