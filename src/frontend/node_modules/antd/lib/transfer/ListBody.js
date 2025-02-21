"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.OmitProps = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _isNativeReflectConstruct2 = _interopRequireDefault(require("@babel/runtime/helpers/isNativeReflectConstruct"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _pagination = _interopRequireDefault(require("../pagination"));
var _type = require("../_util/type");
var _ListItem = _interopRequireDefault(require("./ListItem"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, (0, _isNativeReflectConstruct2["default"])() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
var OmitProps = exports.OmitProps = (0, _type.tuple)('handleFilter', 'handleClear', 'checkedKeys');
function parsePagination(pagination) {
  if (!pagination) {
    return null;
  }
  var defaultPagination = {
    pageSize: 10,
    simple: true,
    showSizeChanger: false,
    showLessItems: false
  };
  if ((0, _typeof2["default"])(pagination) === 'object') {
    return (0, _extends2["default"])((0, _extends2["default"])({}, defaultPagination), pagination);
  }
  return defaultPagination;
}
var ListBody = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ListBody, _React$Component);
  function ListBody() {
    var _this;
    (0, _classCallCheck2["default"])(this, ListBody);
    _this = _callSuper(this, ListBody, arguments);
    _this.state = {
      current: 1
    };
    _this.onItemSelect = function (item) {
      var _this$props = _this.props,
        onItemSelect = _this$props.onItemSelect,
        selectedKeys = _this$props.selectedKeys;
      var checked = selectedKeys.includes(item.key);
      onItemSelect(item.key, !checked);
    };
    _this.onItemRemove = function (item) {
      var onItemRemove = _this.props.onItemRemove;
      onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove([item.key]);
    };
    _this.onPageChange = function (current) {
      _this.setState({
        current: current
      });
    };
    _this.getItems = function () {
      var current = _this.state.current;
      var _this$props2 = _this.props,
        pagination = _this$props2.pagination,
        filteredRenderItems = _this$props2.filteredRenderItems;
      var mergedPagination = parsePagination(pagination);
      var displayItems = filteredRenderItems;
      if (mergedPagination) {
        displayItems = filteredRenderItems.slice((current - 1) * mergedPagination.pageSize, current * mergedPagination.pageSize);
      }
      return displayItems;
    };
    return _this;
  }
  (0, _createClass2["default"])(ListBody, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var current = this.state.current;
      var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        onScroll = _this$props3.onScroll,
        filteredRenderItems = _this$props3.filteredRenderItems,
        selectedKeys = _this$props3.selectedKeys,
        globalDisabled = _this$props3.disabled,
        showRemove = _this$props3.showRemove,
        pagination = _this$props3.pagination;
      var mergedPagination = parsePagination(pagination);
      var paginationNode = null;
      if (mergedPagination) {
        paginationNode = /*#__PURE__*/React.createElement(_pagination["default"], {
          simple: mergedPagination.simple,
          showSizeChanger: mergedPagination.showSizeChanger,
          showLessItems: mergedPagination.showLessItems,
          size: "small",
          disabled: globalDisabled,
          className: "".concat(prefixCls, "-pagination"),
          total: filteredRenderItems.length,
          pageSize: mergedPagination.pageSize,
          current: current,
          onChange: this.onPageChange
        });
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ul", {
        className: (0, _classnames["default"])("".concat(prefixCls, "-content"), (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-content-show-remove"), showRemove)),
        onScroll: onScroll
      }, this.getItems().map(function (_ref) {
        var renderedEl = _ref.renderedEl,
          renderedText = _ref.renderedText,
          item = _ref.item;
        var disabled = item.disabled;
        var checked = selectedKeys.includes(item.key);
        return /*#__PURE__*/React.createElement(_ListItem["default"], {
          disabled: globalDisabled || disabled,
          key: item.key,
          item: item,
          renderedText: renderedText,
          renderedEl: renderedEl,
          checked: checked,
          prefixCls: prefixCls,
          onClick: _this2.onItemSelect,
          onRemove: _this2.onItemRemove,
          showRemove: showRemove
        });
      })), paginationNode);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref2, _ref3) {
      var filteredRenderItems = _ref2.filteredRenderItems,
        pagination = _ref2.pagination;
      var current = _ref3.current;
      var mergedPagination = parsePagination(pagination);
      if (mergedPagination) {
        // Calculate the page number
        var maxPageCount = Math.ceil(filteredRenderItems.length / mergedPagination.pageSize);
        if (current > maxPageCount) {
          return {
            current: maxPageCount
          };
        }
      }
      return null;
    }
  }]);
  return ListBody;
}(React.Component);
var _default = exports["default"] = ListBody;