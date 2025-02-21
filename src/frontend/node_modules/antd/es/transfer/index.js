import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _isNativeReflectConstruct from "@babel/runtime/helpers/esm/isNativeReflectConstruct";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
import classNames from 'classnames';
import * as React from 'react';
import { ConfigConsumer } from '../config-provider';
import defaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import { FormItemInputContext } from '../form/context';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import warning from '../_util/warning';
import List from './list';
import Operation from './operation';
import Search from './search';
var Transfer = /*#__PURE__*/function (_React$Component) {
  _inherits(Transfer, _React$Component);
  function Transfer(props) {
    var _this;
    _classCallCheck(this, Transfer);
    _this = _callSuper(this, Transfer, [props]);
    _this.separatedDataSource = null;
    _this.setStateKeys = function (direction, keys) {
      if (direction === 'left') {
        _this.setState(function (_ref) {
          var sourceSelectedKeys = _ref.sourceSelectedKeys;
          return {
            sourceSelectedKeys: typeof keys === 'function' ? keys(sourceSelectedKeys || []) : keys
          };
        });
      } else {
        _this.setState(function (_ref2) {
          var targetSelectedKeys = _ref2.targetSelectedKeys;
          return {
            targetSelectedKeys: typeof keys === 'function' ? keys(targetSelectedKeys || []) : keys
          };
        });
      }
    };
    _this.getLocale = function (transferLocale, renderEmpty) {
      var _this$props$locale = _this.props.locale,
        locale = _this$props$locale === void 0 ? {} : _this$props$locale;
      return _extends(_extends(_extends({}, transferLocale), {
        notFoundContent: renderEmpty('Transfer')
      }), locale);
    };
    _this.moveTo = function (direction) {
      var _this$props = _this.props,
        _this$props$targetKey = _this$props.targetKeys,
        targetKeys = _this$props$targetKey === void 0 ? [] : _this$props$targetKey,
        _this$props$dataSourc = _this$props.dataSource,
        dataSource = _this$props$dataSourc === void 0 ? [] : _this$props$dataSourc,
        onChange = _this$props.onChange;
      var _this$state = _this.state,
        sourceSelectedKeys = _this$state.sourceSelectedKeys,
        targetSelectedKeys = _this$state.targetSelectedKeys;
      var moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
      // filter the disabled options
      var newMoveKeys = moveKeys.filter(function (key) {
        return !dataSource.some(function (data) {
          return !!(key === data.key && data.disabled);
        });
      });
      // move items to target box
      var newTargetKeys = direction === 'right' ? newMoveKeys.concat(targetKeys) : targetKeys.filter(function (targetKey) {
        return !newMoveKeys.includes(targetKey);
      });
      // empty checked keys
      var oppositeDirection = direction === 'right' ? 'left' : 'right';
      _this.setStateKeys(oppositeDirection, []);
      _this.handleSelectChange(oppositeDirection, []);
      onChange === null || onChange === void 0 ? void 0 : onChange(newTargetKeys, direction, newMoveKeys);
    };
    _this.moveToLeft = function () {
      return _this.moveTo('left');
    };
    _this.moveToRight = function () {
      return _this.moveTo('right');
    };
    _this.onItemSelectAll = function (direction, selectedKeys, checkAll) {
      _this.setStateKeys(direction, function (prevKeys) {
        var mergedCheckedKeys = [];
        if (checkAll === 'replace') {
          mergedCheckedKeys = selectedKeys;
        } else if (checkAll) {
          // Merge current keys with origin key
          mergedCheckedKeys = Array.from(new Set([].concat(_toConsumableArray(prevKeys), _toConsumableArray(selectedKeys))));
        } else {
          // Remove current keys from origin keys
          mergedCheckedKeys = prevKeys.filter(function (key) {
            return !selectedKeys.includes(key);
          });
        }
        _this.handleSelectChange(direction, mergedCheckedKeys);
        return mergedCheckedKeys;
      });
    };
    _this.onLeftItemSelectAll = function (selectedKeys, checkAll) {
      return _this.onItemSelectAll('left', selectedKeys, checkAll);
    };
    _this.onRightItemSelectAll = function (selectedKeys, checkAll) {
      return _this.onItemSelectAll('right', selectedKeys, checkAll);
    };
    _this.handleFilter = function (direction, e) {
      var onSearch = _this.props.onSearch;
      var value = e.target.value;
      onSearch === null || onSearch === void 0 ? void 0 : onSearch(direction, value);
    };
    _this.handleLeftFilter = function (e) {
      return _this.handleFilter('left', e);
    };
    _this.handleRightFilter = function (e) {
      return _this.handleFilter('right', e);
    };
    _this.handleClear = function (direction) {
      var onSearch = _this.props.onSearch;
      onSearch === null || onSearch === void 0 ? void 0 : onSearch(direction, '');
    };
    _this.handleLeftClear = function () {
      return _this.handleClear('left');
    };
    _this.handleRightClear = function () {
      return _this.handleClear('right');
    };
    _this.onItemSelect = function (direction, selectedKey, checked) {
      var _this$state2 = _this.state,
        sourceSelectedKeys = _this$state2.sourceSelectedKeys,
        targetSelectedKeys = _this$state2.targetSelectedKeys;
      var holder = direction === 'left' ? _toConsumableArray(sourceSelectedKeys) : _toConsumableArray(targetSelectedKeys);
      var index = holder.indexOf(selectedKey);
      if (index > -1) {
        holder.splice(index, 1);
      }
      if (checked) {
        holder.push(selectedKey);
      }
      _this.handleSelectChange(direction, holder);
      if (!_this.props.selectedKeys) {
        _this.setStateKeys(direction, holder);
      }
    };
    _this.onLeftItemSelect = function (selectedKey, checked) {
      return _this.onItemSelect('left', selectedKey, checked);
    };
    _this.onRightItemSelect = function (selectedKey, checked) {
      return _this.onItemSelect('right', selectedKey, checked);
    };
    _this.onRightItemRemove = function (selectedKeys) {
      var _this$props2 = _this.props,
        _this$props2$targetKe = _this$props2.targetKeys,
        targetKeys = _this$props2$targetKe === void 0 ? [] : _this$props2$targetKe,
        onChange = _this$props2.onChange;
      _this.setStateKeys('right', []);
      onChange === null || onChange === void 0 ? void 0 : onChange(targetKeys.filter(function (key) {
        return !selectedKeys.includes(key);
      }), 'left', _toConsumableArray(selectedKeys));
    };
    _this.handleScroll = function (direction, e) {
      var onScroll = _this.props.onScroll;
      onScroll === null || onScroll === void 0 ? void 0 : onScroll(direction, e);
    };
    _this.handleLeftScroll = function (e) {
      return _this.handleScroll('left', e);
    };
    _this.handleRightScroll = function (e) {
      return _this.handleScroll('right', e);
    };
    // eslint-disable-next-line class-methods-use-this
    _this.handleListStyle = function (listStyle, direction) {
      if (typeof listStyle === 'function') {
        return listStyle({
          direction: direction
        });
      }
      return listStyle;
    };
    var _props$selectedKeys = props.selectedKeys,
      selectedKeys = _props$selectedKeys === void 0 ? [] : _props$selectedKeys,
      _props$targetKeys = props.targetKeys,
      targetKeys = _props$targetKeys === void 0 ? [] : _props$targetKeys;
    _this.state = {
      sourceSelectedKeys: selectedKeys.filter(function (key) {
        return !targetKeys.includes(key);
      }),
      targetSelectedKeys: selectedKeys.filter(function (key) {
        return targetKeys.includes(key);
      })
    };
    return _this;
  }
  _createClass(Transfer, [{
    key: "getTitles",
    value: function getTitles(transferLocale) {
      var _a, _b;
      return (_b = (_a = this.props.titles) !== null && _a !== void 0 ? _a : transferLocale.titles) !== null && _b !== void 0 ? _b : [];
    }
  }, {
    key: "handleSelectChange",
    value: function handleSelectChange(direction, holder) {
      var _this$state3 = this.state,
        sourceSelectedKeys = _this$state3.sourceSelectedKeys,
        targetSelectedKeys = _this$state3.targetSelectedKeys;
      var onSelectChange = this.props.onSelectChange;
      if (!onSelectChange) {
        return;
      }
      if (direction === 'left') {
        onSelectChange(holder, targetSelectedKeys);
      } else {
        onSelectChange(sourceSelectedKeys, holder);
      }
    }
  }, {
    key: "separateDataSource",
    value: function separateDataSource() {
      var _this$props3 = this.props,
        _this$props3$dataSour = _this$props3.dataSource,
        dataSource = _this$props3$dataSour === void 0 ? [] : _this$props3$dataSour,
        rowKey = _this$props3.rowKey,
        _this$props3$targetKe = _this$props3.targetKeys,
        targetKeys = _this$props3$targetKe === void 0 ? [] : _this$props3$targetKe;
      var leftDataSource = [];
      var rightDataSource = new Array(targetKeys.length);
      dataSource.forEach(function (record) {
        if (rowKey) {
          record = _extends(_extends({}, record), {
            key: rowKey(record)
          });
        }
        // rightDataSource should be ordered by targetKeys
        // leftDataSource should be ordered by dataSource
        var indexOfKey = targetKeys.indexOf(record.key);
        if (indexOfKey !== -1) {
          rightDataSource[indexOfKey] = record;
        } else {
          leftDataSource.push(record);
        }
      });
      return {
        leftDataSource: leftDataSource,
        rightDataSource: rightDataSource
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/React.createElement(LocaleReceiver, {
        componentName: "Transfer",
        defaultLocale: defaultLocale.Transfer
      }, function (contextLocale) {
        return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (_ref3) {
          var getPrefixCls = _ref3.getPrefixCls,
            renderEmpty = _ref3.renderEmpty,
            direction = _ref3.direction;
          return /*#__PURE__*/React.createElement(FormItemInputContext.Consumer, null, function (_ref4) {
            var hasFeedback = _ref4.hasFeedback,
              contextStatus = _ref4.status;
            var _this2$props = _this2.props,
              customizePrefixCls = _this2$props.prefixCls,
              className = _this2$props.className,
              disabled = _this2$props.disabled,
              _this2$props$operatio = _this2$props.operations,
              operations = _this2$props$operatio === void 0 ? [] : _this2$props$operatio,
              _this2$props$showSear = _this2$props.showSearch,
              showSearch = _this2$props$showSear === void 0 ? false : _this2$props$showSear,
              footer = _this2$props.footer,
              style = _this2$props.style,
              _this2$props$listStyl = _this2$props.listStyle,
              listStyle = _this2$props$listStyl === void 0 ? {} : _this2$props$listStyl,
              operationStyle = _this2$props.operationStyle,
              filterOption = _this2$props.filterOption,
              render = _this2$props.render,
              children = _this2$props.children,
              showSelectAll = _this2$props.showSelectAll,
              oneWay = _this2$props.oneWay,
              pagination = _this2$props.pagination,
              customStatus = _this2$props.status;
            var prefixCls = getPrefixCls('transfer', customizePrefixCls);
            var locale = _this2.getLocale(contextLocale, renderEmpty || defaultRenderEmpty);
            var _this2$state = _this2.state,
              sourceSelectedKeys = _this2$state.sourceSelectedKeys,
              targetSelectedKeys = _this2$state.targetSelectedKeys;
            var mergedStatus = getMergedStatus(contextStatus, customStatus);
            var mergedPagination = !children && pagination;
            var _this2$separateDataSo = _this2.separateDataSource(),
              leftDataSource = _this2$separateDataSo.leftDataSource,
              rightDataSource = _this2$separateDataSo.rightDataSource;
            var leftActive = targetSelectedKeys.length > 0;
            var rightActive = sourceSelectedKeys.length > 0;
            var cls = classNames(prefixCls, _defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-customize-list"), !!children), "".concat(prefixCls, "-rtl"), direction === 'rtl'), getStatusClassNames(prefixCls, mergedStatus, hasFeedback), className);
            var titles = _this2.getTitles(locale);
            var selectAllLabels = _this2.props.selectAllLabels || [];
            return /*#__PURE__*/React.createElement("div", {
              className: cls,
              style: style
            }, /*#__PURE__*/React.createElement(List, _extends({
              prefixCls: "".concat(prefixCls, "-list"),
              titleText: titles === null || titles === void 0 ? void 0 : titles[0],
              dataSource: leftDataSource,
              filterOption: filterOption,
              style: _this2.handleListStyle(listStyle, 'left'),
              checkedKeys: sourceSelectedKeys,
              handleFilter: _this2.handleLeftFilter,
              handleClear: _this2.handleLeftClear,
              onItemSelect: _this2.onLeftItemSelect,
              onItemSelectAll: _this2.onLeftItemSelectAll,
              render: render,
              showSearch: showSearch,
              renderList: children,
              footer: footer,
              onScroll: _this2.handleLeftScroll,
              disabled: disabled,
              direction: direction === 'rtl' ? 'right' : 'left',
              showSelectAll: showSelectAll,
              selectAllLabel: selectAllLabels[0],
              pagination: mergedPagination
            }, locale)), /*#__PURE__*/React.createElement(Operation, {
              className: "".concat(prefixCls, "-operation"),
              rightActive: rightActive,
              rightArrowText: operations[0],
              moveToRight: _this2.moveToRight,
              leftActive: leftActive,
              leftArrowText: operations[1],
              moveToLeft: _this2.moveToLeft,
              style: operationStyle,
              disabled: disabled,
              direction: direction,
              oneWay: oneWay
            }), /*#__PURE__*/React.createElement(List, _extends({
              prefixCls: "".concat(prefixCls, "-list"),
              titleText: titles === null || titles === void 0 ? void 0 : titles[1],
              dataSource: rightDataSource,
              filterOption: filterOption,
              style: _this2.handleListStyle(listStyle, 'right'),
              checkedKeys: targetSelectedKeys,
              handleFilter: _this2.handleRightFilter,
              handleClear: _this2.handleRightClear,
              onItemSelect: _this2.onRightItemSelect,
              onItemSelectAll: _this2.onRightItemSelectAll,
              onItemRemove: _this2.onRightItemRemove,
              render: render,
              showSearch: showSearch,
              renderList: children,
              footer: footer,
              onScroll: _this2.handleRightScroll,
              disabled: disabled,
              direction: direction === 'rtl' ? 'left' : 'right',
              showSelectAll: showSelectAll,
              selectAllLabel: selectAllLabels[1],
              showRemove: oneWay,
              pagination: mergedPagination
            }, locale)));
          });
        });
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref5) {
      var selectedKeys = _ref5.selectedKeys,
        targetKeys = _ref5.targetKeys,
        pagination = _ref5.pagination,
        children = _ref5.children;
      if (selectedKeys) {
        var mergedTargetKeys = targetKeys || [];
        return {
          sourceSelectedKeys: selectedKeys.filter(function (key) {
            return !mergedTargetKeys.includes(key);
          }),
          targetSelectedKeys: selectedKeys.filter(function (key) {
            return mergedTargetKeys.includes(key);
          })
        };
      }
      process.env.NODE_ENV !== "production" ? warning(!pagination || !children, 'Transfer', '`pagination` not support customize render list.') : void 0;
      return null;
    }
  }]);
  return Transfer;
}(React.Component); // For high-level customized Transfer @dqaria
Transfer.List = List;
Transfer.Operation = Operation;
Transfer.Search = Search;
export default Transfer;