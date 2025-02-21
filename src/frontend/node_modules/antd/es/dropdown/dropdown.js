import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import RightOutlined from "@ant-design/icons/es/icons/RightOutlined";
import classNames from 'classnames';
import RcDropdown from 'rc-dropdown';
import useEvent from "rc-util/es/hooks/useEvent";
import useMergedState from "rc-util/es/hooks/useMergedState";
import * as React from 'react';
import Menu from '../menu';
import { ConfigContext } from '../config-provider';
import { OverrideProvider } from '../menu/OverrideContext';
import getPlacements from '../_util/placements';
import { cloneElement } from '../_util/reactNode';
import { tuple } from '../_util/type';
import warning from '../_util/warning';
import DropdownButton from './dropdown-button';
import { NoCompactStyle } from '../space/Compact';
var Placements = tuple('topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight', 'top', 'bottom');
var Dropdown = function Dropdown(props) {
  var _React$useContext = React.useContext(ConfigContext),
    getContextPopupContainer = _React$useContext.getPopupContainer,
    getPrefixCls = _React$useContext.getPrefixCls,
    direction = _React$useContext.direction;
  // Warning for deprecated usage
  if (process.env.NODE_ENV !== 'production') {
    [['visible', 'open'], ['onVisibleChange', 'onOpenChange']].forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        deprecatedName = _ref2[0],
        newName = _ref2[1];
      process.env.NODE_ENV !== "production" ? warning(!(deprecatedName in props), 'Dropdown', "`".concat(deprecatedName, "` is deprecated which will be removed in next major version, please use `").concat(newName, "` instead.")) : void 0;
    });
    process.env.NODE_ENV !== "production" ? warning(!('overlay' in props), 'Dropdown', '`overlay` is deprecated. Please use `menu` instead.') : void 0;
  }
  var getTransitionName = function getTransitionName() {
    var rootPrefixCls = getPrefixCls();
    var _props$placement = props.placement,
      placement = _props$placement === void 0 ? '' : _props$placement,
      transitionName = props.transitionName;
    if (transitionName !== undefined) {
      return transitionName;
    }
    if (placement.includes('top')) {
      return "".concat(rootPrefixCls, "-slide-down");
    }
    return "".concat(rootPrefixCls, "-slide-up");
  };
  var getPlacement = function getPlacement() {
    var placement = props.placement;
    if (!placement) {
      return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
    }
    if (placement.includes('Center')) {
      var newPlacement = placement.slice(0, placement.indexOf('Center'));
      process.env.NODE_ENV !== "production" ? warning(!placement.includes('Center'), 'Dropdown', "You are using '".concat(placement, "' placement in Dropdown, which is deprecated. Try to use '").concat(newPlacement, "' instead.")) : void 0;
      return newPlacement;
    }
    return placement;
  };
  var menu = props.menu,
    arrow = props.arrow,
    customizePrefixCls = props.prefixCls,
    children = props.children,
    trigger = props.trigger,
    disabled = props.disabled,
    dropdownRender = props.dropdownRender,
    getPopupContainer = props.getPopupContainer,
    overlayClassName = props.overlayClassName,
    visible = props.visible,
    open = props.open,
    onVisibleChange = props.onVisibleChange,
    onOpenChange = props.onOpenChange,
    _props$mouseEnterDela = props.mouseEnterDelay,
    mouseEnterDelay = _props$mouseEnterDela === void 0 ? 0.15 : _props$mouseEnterDela,
    _props$mouseLeaveDela = props.mouseLeaveDelay,
    mouseLeaveDelay = _props$mouseLeaveDela === void 0 ? 0.1 : _props$mouseLeaveDela,
    _props$autoAdjustOver = props.autoAdjustOverflow,
    autoAdjustOverflow = _props$autoAdjustOver === void 0 ? true : _props$autoAdjustOver;
  var prefixCls = getPrefixCls('dropdown', customizePrefixCls);
  var child = React.Children.only(children);
  var dropdownTrigger = cloneElement(child, {
    className: classNames("".concat(prefixCls, "-trigger"), _defineProperty({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), child.props.className),
    disabled: disabled
  });
  var triggerActions = disabled ? [] : trigger;
  var alignPoint;
  if (triggerActions && triggerActions.includes('contextMenu')) {
    alignPoint = true;
  }
  // =========================== Visible ============================
  var _useMergedState = useMergedState(false, {
      value: open !== undefined ? open : visible
    }),
    _useMergedState2 = _slicedToArray(_useMergedState, 2),
    mergedOpen = _useMergedState2[0],
    setOpen = _useMergedState2[1];
  var onInnerOpenChange = useEvent(function (nextOpen) {
    onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(nextOpen);
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(nextOpen);
    setOpen(nextOpen);
  });
  // =========================== Overlay ============================
  var overlayClassNameCustomized = classNames(overlayClassName, _defineProperty({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'));
  var builtinPlacements = getPlacements({
    arrowPointAtCenter: _typeof(arrow) === 'object' && arrow.pointAtCenter,
    autoAdjustOverflow: autoAdjustOverflow
  });
  var onMenuClick = React.useCallback(function () {
    setOpen(false);
  }, []);
  var renderOverlay = function renderOverlay() {
    // rc-dropdown already can process the function of overlay, but we have check logic here.
    // So we need render the element to check and pass back to rc-dropdown.
    var overlay = props.overlay;
    var overlayNode;
    if (menu === null || menu === void 0 ? void 0 : menu.items) {
      overlayNode = /*#__PURE__*/React.createElement(Menu, _extends({}, menu));
    } else if (typeof overlay === 'function') {
      overlayNode = overlay();
    } else {
      overlayNode = overlay;
    }
    if (dropdownRender) {
      overlayNode = dropdownRender(overlayNode);
    }
    overlayNode = React.Children.only(typeof overlayNode === 'string' ? /*#__PURE__*/React.createElement("span", null, overlayNode) : overlayNode);
    return /*#__PURE__*/React.createElement(OverrideProvider, {
      prefixCls: "".concat(prefixCls, "-menu"),
      expandIcon: /*#__PURE__*/React.createElement("span", {
        className: "".concat(prefixCls, "-menu-submenu-arrow")
      }, /*#__PURE__*/React.createElement(RightOutlined, {
        className: "".concat(prefixCls, "-menu-submenu-arrow-icon")
      })),
      mode: "vertical",
      selectable: false,
      onClick: onMenuClick,
      validator: function validator(_ref3) {
        var mode = _ref3.mode;
        // Warning if use other mode
        process.env.NODE_ENV !== "production" ? warning(!mode || mode === 'vertical', 'Dropdown', "mode=\"".concat(mode, "\" is not supported for Dropdown's Menu.")) : void 0;
      }
    }, /*#__PURE__*/React.createElement(NoCompactStyle, null, overlayNode));
  };
  // ============================ Render ============================
  return /*#__PURE__*/React.createElement(RcDropdown, _extends({
    alignPoint: alignPoint
  }, props, {
    mouseEnterDelay: mouseEnterDelay,
    mouseLeaveDelay: mouseLeaveDelay,
    visible: mergedOpen,
    builtinPlacements: builtinPlacements,
    arrow: !!arrow,
    overlayClassName: overlayClassNameCustomized,
    prefixCls: prefixCls,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    transitionName: getTransitionName(),
    trigger: triggerActions,
    overlay: renderOverlay,
    placement: getPlacement(),
    onVisibleChange: onInnerOpenChange
  }), dropdownTrigger);
};
Dropdown.Button = DropdownButton;
export default Dropdown;