"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _TableContext = _interopRequireDefault(require("../context/TableContext"));

var _ExpandedRow = _interopRequireDefault(require("./ExpandedRow"));

var _BodyContext = _interopRequireDefault(require("../context/BodyContext"));

var _valueUtil = require("../utils/valueUtil");

var _ResizeContext = _interopRequireDefault(require("../context/ResizeContext"));

var _BodyRow = _interopRequireDefault(require("./BodyRow"));

var _useFlattenRecords = _interopRequireDefault(require("../hooks/useFlattenRecords"));

var _HoverContext = _interopRequireDefault(require("../context/HoverContext"));

var _PerfContext = _interopRequireDefault(require("../context/PerfContext"));

var _MeasureRow = _interopRequireDefault(require("./MeasureRow"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Body(_ref) {
  var data = _ref.data,
      getRowKey = _ref.getRowKey,
      measureColumnWidth = _ref.measureColumnWidth,
      expandedKeys = _ref.expandedKeys,
      onRow = _ref.onRow,
      rowExpandable = _ref.rowExpandable,
      emptyNode = _ref.emptyNode,
      childrenColumnName = _ref.childrenColumnName;

  var _React$useContext = React.useContext(_ResizeContext.default),
      onColumnResize = _React$useContext.onColumnResize;

  var _React$useContext2 = React.useContext(_TableContext.default),
      prefixCls = _React$useContext2.prefixCls,
      getComponent = _React$useContext2.getComponent;

  var _React$useContext3 = React.useContext(_BodyContext.default),
      flattenColumns = _React$useContext3.flattenColumns;

  var flattenData = (0, _useFlattenRecords.default)(data, childrenColumnName, expandedKeys, getRowKey); // =================== Performance ====================

  var perfRef = React.useRef({
    renderWithProps: false
  }); // ====================== Hover =======================

  var _React$useState = React.useState(-1),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      startRow = _React$useState2[0],
      setStartRow = _React$useState2[1];

  var _React$useState3 = React.useState(-1),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      endRow = _React$useState4[0],
      setEndRow = _React$useState4[1];

  var onHover = React.useCallback(function (start, end) {
    setStartRow(start);
    setEndRow(end);
  }, []); // ====================== Render ======================

  var bodyNode = React.useMemo(function () {
    var WrapperComponent = getComponent(['body', 'wrapper'], 'tbody');
    var trComponent = getComponent(['body', 'row'], 'tr');
    var tdComponent = getComponent(['body', 'cell'], 'td');
    var rows;

    if (data.length) {
      rows = flattenData.map(function (item, idx) {
        var record = item.record,
            indent = item.indent,
            renderIndex = item.index;
        var key = getRowKey(record, idx);
        return /*#__PURE__*/React.createElement(_BodyRow.default, {
          key: key,
          rowKey: key,
          record: record,
          recordKey: key,
          index: idx,
          renderIndex: renderIndex,
          rowComponent: trComponent,
          cellComponent: tdComponent,
          expandedKeys: expandedKeys,
          onRow: onRow,
          getRowKey: getRowKey,
          rowExpandable: rowExpandable,
          childrenColumnName: childrenColumnName,
          indent: indent
        });
      });
    } else {
      rows = /*#__PURE__*/React.createElement(_ExpandedRow.default, {
        expanded: true,
        className: "".concat(prefixCls, "-placeholder"),
        prefixCls: prefixCls,
        component: trComponent,
        cellComponent: tdComponent,
        colSpan: flattenColumns.length,
        isEmpty: true
      }, emptyNode);
    }

    var columnsKey = (0, _valueUtil.getColumnsKey)(flattenColumns);
    return /*#__PURE__*/React.createElement(WrapperComponent, {
      className: "".concat(prefixCls, "-tbody")
    }, measureColumnWidth && /*#__PURE__*/React.createElement(_MeasureRow.default, {
      prefixCls: prefixCls,
      columnsKey: columnsKey,
      onColumnResize: onColumnResize
    }), rows);
  }, [data, prefixCls, onRow, measureColumnWidth, expandedKeys, getRowKey, getComponent, emptyNode, flattenColumns, childrenColumnName, onColumnResize, rowExpandable, flattenData]);
  return /*#__PURE__*/React.createElement(_PerfContext.default.Provider, {
    value: perfRef.current
  }, /*#__PURE__*/React.createElement(_HoverContext.default.Provider, {
    value: {
      startRow: startRow,
      endRow: endRow,
      onHover: onHover
    }
  }, bodyNode));
}

var MemoBody = /*#__PURE__*/React.memo(Body);
MemoBody.displayName = 'Body';
var _default = MemoBody;
exports.default = _default;