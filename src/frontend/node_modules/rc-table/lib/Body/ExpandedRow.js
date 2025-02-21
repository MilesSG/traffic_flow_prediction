"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _Cell = _interopRequireDefault(require("../Cell"));

var _TableContext = _interopRequireDefault(require("../context/TableContext"));

var _ExpandedRowContext = _interopRequireDefault(require("../context/ExpandedRowContext"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ExpandedRow(_ref) {
  var prefixCls = _ref.prefixCls,
      children = _ref.children,
      Component = _ref.component,
      cellComponent = _ref.cellComponent,
      className = _ref.className,
      expanded = _ref.expanded,
      colSpan = _ref.colSpan,
      isEmpty = _ref.isEmpty;

  var _React$useContext = React.useContext(_TableContext.default),
      scrollbarSize = _React$useContext.scrollbarSize;

  var _React$useContext2 = React.useContext(_ExpandedRowContext.default),
      fixHeader = _React$useContext2.fixHeader,
      fixColumn = _React$useContext2.fixColumn,
      componentWidth = _React$useContext2.componentWidth,
      horizonScroll = _React$useContext2.horizonScroll; // Cache render node


  return React.useMemo(function () {
    var contentNode = children;

    if (isEmpty ? horizonScroll : fixColumn) {
      contentNode = /*#__PURE__*/React.createElement("div", {
        style: {
          width: componentWidth - (fixHeader ? scrollbarSize : 0),
          position: 'sticky',
          left: 0,
          overflow: 'hidden'
        },
        className: "".concat(prefixCls, "-expanded-row-fixed")
      }, componentWidth !== 0 && contentNode);
    }

    return /*#__PURE__*/React.createElement(Component, {
      className: className,
      style: {
        display: expanded ? null : 'none'
      }
    }, /*#__PURE__*/React.createElement(_Cell.default, {
      component: cellComponent,
      prefixCls: prefixCls,
      colSpan: colSpan
    }, contentNode));
  }, [children, Component, className, expanded, colSpan, isEmpty, scrollbarSize, componentWidth, fixColumn, fixHeader, horizonScroll]);
}

var _default = ExpandedRow;
exports.default = _default;