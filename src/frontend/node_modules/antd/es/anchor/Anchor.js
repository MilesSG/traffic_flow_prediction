import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import classNames from 'classnames';
import addEventListener from "rc-util/es/Dom/addEventListener";
import * as React from 'react';
import Affix from '../affix';
import { ConfigContext } from '../config-provider';
import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';
import AnchorContext from './context';
function getDefaultContainer() {
  return window;
}
function getOffsetTop(element, container) {
  if (!element.getClientRects().length) {
    return 0;
  }
  var rect = element.getBoundingClientRect();
  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument.documentElement;
      return rect.top - container.clientTop;
    }
    return rect.top - container.getBoundingClientRect().top;
  }
  return rect.top;
}
var sharpMatcherRegx = /#([\S ]+)$/;
var AnchorContent = function AnchorContent(props) {
  var _a;
  var prefixCls = props.anchorPrefixCls,
    _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className,
    style = props.style,
    offsetTop = props.offsetTop,
    _props$affix = props.affix,
    affix = _props$affix === void 0 ? true : _props$affix,
    _props$showInkInFixed = props.showInkInFixed,
    showInkInFixed = _props$showInkInFixed === void 0 ? false : _props$showInkInFixed,
    children = props.children,
    bounds = props.bounds,
    targetOffset = props.targetOffset,
    onClick = props.onClick,
    onChange = props.onChange,
    getContainer = props.getContainer,
    getCurrentAnchor = props.getCurrentAnchor;
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    links = _React$useState2[0],
    setLinks = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    activeLink = _React$useState4[0],
    setActiveLink = _React$useState4[1];
  var activeLinkRef = React.useRef(activeLink);
  var wrapperRef = React.useRef(null);
  var spanLinkNode = React.useRef(null);
  var animating = React.useRef(false);
  var _React$useContext = React.useContext(ConfigContext),
    direction = _React$useContext.direction,
    getTargetContainer = _React$useContext.getTargetContainer;
  var getCurrentContainer = (_a = getContainer !== null && getContainer !== void 0 ? getContainer : getTargetContainer) !== null && _a !== void 0 ? _a : getDefaultContainer;
  var dependencyListItem = JSON.stringify(links);
  var registerLink = React.useCallback(function (link) {
    if (!links.includes(link)) {
      setLinks(function (prev) {
        return [].concat(_toConsumableArray(prev), [link]);
      });
    }
  }, [dependencyListItem]);
  var unregisterLink = React.useCallback(function (link) {
    if (links.includes(link)) {
      setLinks(function (prev) {
        return prev.filter(function (i) {
          return i !== link;
        });
      });
    }
  }, [dependencyListItem]);
  var updateInk = function updateInk() {
    var _a;
    var linkNode = (_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(".".concat(prefixCls, "-link-title-active"));
    if (linkNode && spanLinkNode.current) {
      spanLinkNode.current.style.top = "".concat(linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5, "px");
    }
  };
  var getInternalCurrentAnchor = function getInternalCurrentAnchor(_links) {
    var _offsetTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var _bounds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
    var linkSections = [];
    var container = getCurrentContainer();
    _links.forEach(function (link) {
      var sharpLinkMatch = sharpMatcherRegx.exec(link === null || link === void 0 ? void 0 : link.toString());
      if (!sharpLinkMatch) {
        return;
      }
      var target = document.getElementById(sharpLinkMatch[1]);
      if (target) {
        var top = getOffsetTop(target, container);
        if (top < _offsetTop + _bounds) {
          linkSections.push({
            link: link,
            top: top
          });
        }
      }
    });
    if (linkSections.length) {
      var maxSection = linkSections.reduce(function (prev, curr) {
        return curr.top > prev.top ? curr : prev;
      });
      return maxSection.link;
    }
    return '';
  };
  var setCurrentActiveLink = function setCurrentActiveLink(link) {
    if (activeLinkRef.current === link) {
      return;
    }
    // https://github.com/ant-design/ant-design/issues/30584
    var newLink = typeof getCurrentAnchor === 'function' ? getCurrentAnchor(link) : link;
    setActiveLink(newLink);
    activeLinkRef.current = newLink;
    // onChange should respect the original link (which may caused by
    // window scroll or user click), not the new link
    onChange === null || onChange === void 0 ? void 0 : onChange(link);
  };
  var handleScroll = React.useCallback(function () {
    if (animating.current) {
      return;
    }
    var currentActiveLink = getInternalCurrentAnchor(links, targetOffset !== undefined ? targetOffset : offsetTop || 0, bounds);
    setCurrentActiveLink(currentActiveLink);
  }, [dependencyListItem, targetOffset, offsetTop]);
  var handleScrollTo = React.useCallback(function (link) {
    setCurrentActiveLink(link);
    var container = getCurrentContainer();
    var scrollTop = getScroll(container, true);
    var sharpLinkMatch = sharpMatcherRegx.exec(link);
    if (!sharpLinkMatch) {
      return;
    }
    var targetElement = document.getElementById(sharpLinkMatch[1]);
    if (!targetElement) {
      return;
    }
    var eleOffsetTop = getOffsetTop(targetElement, container);
    var y = scrollTop + eleOffsetTop;
    y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
    animating.current = true;
    scrollTo(y, {
      getContainer: getCurrentContainer,
      callback: function callback() {
        animating.current = false;
      }
    });
  }, [targetOffset, offsetTop]);
  var inkClass = classNames(_defineProperty({}, "".concat(prefixCls, "-ink-ball-visible"), activeLink), "".concat(prefixCls, "-ink-ball"));
  var wrapperClass = classNames("".concat(prefixCls, "-wrapper"), _defineProperty({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  var anchorClass = classNames(prefixCls, _defineProperty({}, "".concat(prefixCls, "-fixed"), !affix && !showInkInFixed));
  var wrapperStyle = _extends({
    maxHeight: offsetTop ? "calc(100vh - ".concat(offsetTop, "px)") : '100vh'
  }, style);
  var anchorContent = /*#__PURE__*/React.createElement("div", {
    ref: wrapperRef,
    className: wrapperClass,
    style: wrapperStyle
  }, /*#__PURE__*/React.createElement("div", {
    className: anchorClass
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(prefixCls, "-ink")
  }, /*#__PURE__*/React.createElement("span", {
    className: inkClass,
    ref: spanLinkNode
  })), children));
  React.useEffect(function () {
    var scrollContainer = getCurrentContainer();
    var scrollEvent = addEventListener(scrollContainer, 'scroll', handleScroll);
    handleScroll();
    return function () {
      scrollEvent === null || scrollEvent === void 0 ? void 0 : scrollEvent.remove();
    };
  }, [dependencyListItem]);
  React.useEffect(function () {
    if (typeof getCurrentAnchor === 'function') {
      setCurrentActiveLink(getCurrentAnchor(activeLinkRef.current || ''));
    }
  }, [getCurrentAnchor]);
  React.useEffect(function () {
    updateInk();
  }, [getCurrentAnchor, dependencyListItem, activeLink]);
  var memoizedContextValue = React.useMemo(function () {
    return {
      registerLink: registerLink,
      unregisterLink: unregisterLink,
      scrollTo: handleScrollTo,
      activeLink: activeLink,
      onClick: onClick
    };
  }, [activeLink, onClick, handleScrollTo]);
  return /*#__PURE__*/React.createElement(AnchorContext.Provider, {
    value: memoizedContextValue
  }, affix ? ( /*#__PURE__*/React.createElement(Affix, {
    offsetTop: offsetTop,
    target: getCurrentContainer
  }, anchorContent)) : anchorContent);
};
var Anchor = function Anchor(props) {
  var customizePrefixCls = props.prefixCls;
  var _React$useContext2 = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext2.getPrefixCls;
  var anchorPrefixCls = getPrefixCls('anchor', customizePrefixCls);
  return /*#__PURE__*/React.createElement(AnchorContent, _extends({}, props, {
    anchorPrefixCls: anchorPrefixCls
  }));
};
export default Anchor;