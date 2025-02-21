"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _EllipsisOutlined = _interopRequireDefault(require("@ant-design/icons/EllipsisOutlined"));
var _PlusOutlined = _interopRequireDefault(require("@ant-design/icons/PlusOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcTabs = _interopRequireDefault(require("rc-tabs"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));
var _warning = _interopRequireDefault(require("../_util/warning"));
var _useAnimateConfig = _interopRequireDefault(require("./hooks/useAnimateConfig"));
var _useLegacyItems = _interopRequireDefault(require("./hooks/useLegacyItems"));
var _TabPane = _interopRequireDefault(require("./TabPane"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function Tabs(_a) {
  var type = _a.type,
    className = _a.className,
    propSize = _a.size,
    _onEdit = _a.onEdit,
    hideAdd = _a.hideAdd,
    centered = _a.centered,
    addIcon = _a.addIcon,
    children = _a.children,
    items = _a.items,
    animated = _a.animated,
    props = __rest(_a, ["type", "className", "size", "onEdit", "hideAdd", "centered", "addIcon", "children", "items", "animated"]);
  var customizePrefixCls = props.prefixCls,
    _props$moreIcon = props.moreIcon,
    moreIcon = _props$moreIcon === void 0 ? /*#__PURE__*/React.createElement(_EllipsisOutlined["default"], null) : _props$moreIcon;
  var _React$useContext = React.useContext(_configProvider.ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction,
    getPopupContainer = _React$useContext.getPopupContainer;
  var prefixCls = getPrefixCls('tabs', customizePrefixCls);
  var editable;
  if (type === 'editable-card') {
    editable = {
      onEdit: function onEdit(editType, _ref) {
        var key = _ref.key,
          event = _ref.event;
        _onEdit === null || _onEdit === void 0 ? void 0 : _onEdit(editType === 'add' ? event : key, editType);
      },
      removeIcon: /*#__PURE__*/React.createElement(_CloseOutlined["default"], null),
      addIcon: addIcon || /*#__PURE__*/React.createElement(_PlusOutlined["default"], null),
      showAdd: hideAdd !== true
    };
  }
  var rootPrefixCls = getPrefixCls();
  process.env.NODE_ENV !== "production" ? (0, _warning["default"])(!('onPrevClick' in props) && !('onNextClick' in props), 'Tabs', '`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead.') : void 0;
  var mergedItems = (0, _useLegacyItems["default"])(items, children);
  var mergedAnimated = (0, _useAnimateConfig["default"])(prefixCls, animated);
  return /*#__PURE__*/React.createElement(_SizeContext["default"].Consumer, null, function (contextSize) {
    var size = propSize !== undefined ? propSize : contextSize;
    return /*#__PURE__*/React.createElement(_rcTabs["default"], (0, _extends2["default"])({
      direction: direction,
      getPopupContainer: getPopupContainer,
      moreTransitionName: "".concat(rootPrefixCls, "-slide-up")
    }, props, {
      items: mergedItems,
      className: (0, _classnames["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, "".concat(prefixCls, "-").concat(size), size), "".concat(prefixCls, "-card"), ['card', 'editable-card'].includes(type)), "".concat(prefixCls, "-editable-card"), type === 'editable-card'), "".concat(prefixCls, "-centered"), centered), className),
      editable: editable,
      moreIcon: moreIcon,
      prefixCls: prefixCls,
      animated: mergedAnimated
    }));
  });
}
Tabs.TabPane = _TabPane["default"];
var _default = exports["default"] = Tabs;