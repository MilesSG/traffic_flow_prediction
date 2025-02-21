"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _HolderOutlined = _interopRequireDefault(require("@ant-design/icons/HolderOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcTree = _interopRequireDefault(require("rc-tree"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _motion = _interopRequireDefault(require("../_util/motion"));
var _dropIndicator = _interopRequireDefault(require("./utils/dropIndicator"));
var _iconUtil = _interopRequireDefault(require("./utils/iconUtil"));
var Tree = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction,
    virtual = _React$useContext.virtual;
  var customizePrefixCls = props.prefixCls,
    className = props.className,
    _props$showIcon = props.showIcon,
    showIcon = _props$showIcon === void 0 ? false : _props$showIcon,
    showLine = props.showLine,
    _switcherIcon = props.switcherIcon,
    _props$blockNode = props.blockNode,
    blockNode = _props$blockNode === void 0 ? false : _props$blockNode,
    children = props.children,
    _props$checkable = props.checkable,
    checkable = _props$checkable === void 0 ? false : _props$checkable,
    _props$selectable = props.selectable,
    selectable = _props$selectable === void 0 ? true : _props$selectable,
    draggable = props.draggable,
    _props$motion = props.motion,
    motion = _props$motion === void 0 ? (0, _extends2["default"])((0, _extends2["default"])({}, _motion["default"]), {
      motionAppear: false
    }) : _props$motion;
  var prefixCls = getPrefixCls('tree', customizePrefixCls);
  var newProps = (0, _extends2["default"])((0, _extends2["default"])({}, props), {
    checkable: checkable,
    selectable: selectable,
    showIcon: showIcon,
    motion: motion,
    blockNode: blockNode,
    showLine: Boolean(showLine),
    dropIndicatorRender: _dropIndicator["default"]
  });
  var draggableConfig = React.useMemo(function () {
    if (!draggable) {
      return false;
    }
    var mergedDraggable = {};
    switch ((0, _typeof2["default"])(draggable)) {
      case 'function':
        mergedDraggable.nodeDraggable = draggable;
        break;
      case 'object':
        mergedDraggable = (0, _extends2["default"])({}, draggable);
        break;
      default:
        break;
      // Do nothing
    }
    if (mergedDraggable.icon !== false) {
      mergedDraggable.icon = mergedDraggable.icon || /*#__PURE__*/React.createElement(_HolderOutlined["default"], null);
    }
    return mergedDraggable;
  }, [draggable]);
  return /*#__PURE__*/React.createElement(_rcTree["default"], (0, _extends2["default"])({
    itemHeight: 20,
    ref: ref,
    virtual: virtual
  }, newProps, {
    prefixCls: prefixCls,
    className: (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-icon-hide"), !showIcon), "".concat(prefixCls, "-block-node"), blockNode), "".concat(prefixCls, "-unselectable"), !selectable), "".concat(prefixCls, "-rtl"), direction === 'rtl'), className),
    direction: direction,
    checkable: checkable ? /*#__PURE__*/React.createElement("span", {
      className: "".concat(prefixCls, "-checkbox-inner")
    }) : checkable,
    selectable: selectable,
    switcherIcon: function switcherIcon(nodeProps) {
      return (0, _iconUtil["default"])(prefixCls, _switcherIcon, showLine, nodeProps);
    },
    draggable: draggableConfig
  }), children);
});
var _default = exports["default"] = Tree;