"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _Step = _interopRequireDefault(require("./Step"));

var _excluded = ["prefixCls", "style", "className", "children", "direction", "type", "labelPlacement", "iconPrefix", "status", "size", "current", "progressDot", "stepIcon", "initial", "icons", "onChange", "items"];

var Steps = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Steps, _React$Component);

  var _super = (0, _createSuper2.default)(Steps);

  function Steps() {
    var _this;

    (0, _classCallCheck2.default)(this, Steps);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onStepClick", function (next) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          current = _this$props.current;

      if (onChange && current !== next) {
        onChange(next);
      }
    });
    return _this;
  }

  (0, _createClass2.default)(Steps, [{
    key: "render",
    value: function render() {
      var _classNames,
          _this2 = this;

      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          _this$props2$style = _this$props2.style,
          style = _this$props2$style === void 0 ? {} : _this$props2$style,
          className = _this$props2.className,
          children = _this$props2.children,
          direction = _this$props2.direction,
          type = _this$props2.type,
          labelPlacement = _this$props2.labelPlacement,
          iconPrefix = _this$props2.iconPrefix,
          status = _this$props2.status,
          size = _this$props2.size,
          current = _this$props2.current,
          progressDot = _this$props2.progressDot,
          stepIcon = _this$props2.stepIcon,
          initial = _this$props2.initial,
          icons = _this$props2.icons,
          onChange = _this$props2.onChange,
          _this$props2$items = _this$props2.items,
          items = _this$props2$items === void 0 ? [] : _this$props2$items,
          restProps = (0, _objectWithoutProperties2.default)(_this$props2, _excluded);
      var isNav = type === 'navigation';
      var adjustedLabelPlacement = progressDot ? 'vertical' : labelPlacement;
      var classString = (0, _classnames.default)(prefixCls, "".concat(prefixCls, "-").concat(direction), className, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-").concat(size), size), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-label-").concat(adjustedLabelPlacement), direction === 'horizontal'), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-dot"), !!progressDot), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-navigation"), isNav), _classNames));
      return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
        className: classString,
        style: style
      }, restProps), items.filter(function (item) {
        return item;
      }).map(function (item, index) {
        var mergedItem = (0, _objectSpread2.default)({}, item);
        var stepNumber = initial + index; // fix tail color

        if (status === 'error' && index === current - 1) {
          mergedItem.className = "".concat(prefixCls, "-next-error");
        }

        if (!mergedItem.status) {
          if (stepNumber === current) {
            mergedItem.status = status;
          } else if (stepNumber < current) {
            mergedItem.status = 'finish';
          } else {
            mergedItem.status = 'wait';
          }
        }

        return /*#__PURE__*/_react.default.createElement(_Step.default, (0, _extends2.default)({}, mergedItem, {
          active: stepNumber === current,
          stepNumber: stepNumber + 1,
          stepIndex: stepNumber,
          key: stepNumber,
          prefixCls: prefixCls,
          iconPrefix: iconPrefix,
          wrapperStyle: style,
          progressDot: progressDot,
          stepIcon: stepIcon,
          icons: icons,
          onStepClick: onChange && _this2.onStepClick
        }));
      }));
    }
  }]);
  return Steps;
}(_react.default.Component);

exports.default = Steps;
(0, _defineProperty2.default)(Steps, "Step", _Step.default);
(0, _defineProperty2.default)(Steps, "defaultProps", {
  type: 'default',
  prefixCls: 'rc-steps',
  iconPrefix: 'rc',
  direction: 'horizontal',
  labelPlacement: 'horizontal',
  initial: 0,
  current: 0,
  status: 'process',
  size: '',
  progressDot: false
});