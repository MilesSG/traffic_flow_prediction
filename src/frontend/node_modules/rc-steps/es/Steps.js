import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var _excluded = ["prefixCls", "style", "className", "children", "direction", "type", "labelPlacement", "iconPrefix", "status", "size", "current", "progressDot", "stepIcon", "initial", "icons", "onChange", "items"];

/* eslint react/no-did-mount-set-state: 0, react/prop-types: 0 */
import classNames from 'classnames';
import React from 'react';
import Step from "./Step";

var Steps = /*#__PURE__*/function (_React$Component) {
  _inherits(Steps, _React$Component);

  var _super = _createSuper(Steps);

  function Steps() {
    var _this;

    _classCallCheck(this, Steps);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onStepClick", function (next) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          current = _this$props.current;

      if (onChange && current !== next) {
        onChange(next);
      }
    });

    return _this;
  }

  _createClass(Steps, [{
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
          restProps = _objectWithoutProperties(_this$props2, _excluded);

      var isNav = type === 'navigation';
      var adjustedLabelPlacement = progressDot ? 'vertical' : labelPlacement;
      var classString = classNames(prefixCls, "".concat(prefixCls, "-").concat(direction), className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(size), size), _defineProperty(_classNames, "".concat(prefixCls, "-label-").concat(adjustedLabelPlacement), direction === 'horizontal'), _defineProperty(_classNames, "".concat(prefixCls, "-dot"), !!progressDot), _defineProperty(_classNames, "".concat(prefixCls, "-navigation"), isNav), _classNames));
      return /*#__PURE__*/React.createElement("div", _extends({
        className: classString,
        style: style
      }, restProps), items.filter(function (item) {
        return item;
      }).map(function (item, index) {
        var mergedItem = _objectSpread({}, item);

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

        return /*#__PURE__*/React.createElement(Step, _extends({}, mergedItem, {
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
}(React.Component);

_defineProperty(Steps, "Step", Step);

_defineProperty(Steps, "defaultProps", {
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

export { Steps as default };