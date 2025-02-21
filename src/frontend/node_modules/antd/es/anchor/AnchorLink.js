import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import classNames from 'classnames';
import * as React from 'react';
import { ConfigConsumer } from '../config-provider';
import AnchorContext from './context';
var AnchorLink = function AnchorLink(props) {
  var _props$href = props.href,
    href = _props$href === void 0 ? '#' : _props$href,
    title = props.title,
    customizePrefixCls = props.prefixCls,
    children = props.children,
    className = props.className,
    target = props.target;
  var context = React.useContext(AnchorContext);
  var _ref = context || {},
    registerLink = _ref.registerLink,
    unregisterLink = _ref.unregisterLink,
    scrollTo = _ref.scrollTo,
    onClick = _ref.onClick,
    activeLink = _ref.activeLink;
  React.useEffect(function () {
    registerLink === null || registerLink === void 0 ? void 0 : registerLink(href);
    return function () {
      unregisterLink === null || unregisterLink === void 0 ? void 0 : unregisterLink(href);
    };
  }, [href, registerLink, unregisterLink]);
  var handleClick = function handleClick(e) {
    onClick === null || onClick === void 0 ? void 0 : onClick(e, {
      title: title,
      href: href
    });
    scrollTo === null || scrollTo === void 0 ? void 0 : scrollTo(href);
  };
  return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (_ref2) {
    var getPrefixCls = _ref2.getPrefixCls;
    var prefixCls = getPrefixCls('anchor', customizePrefixCls);
    var active = activeLink === href;
    var wrapperClassName = classNames("".concat(prefixCls, "-link"), className, _defineProperty({}, "".concat(prefixCls, "-link-active"), active));
    var titleClassName = classNames("".concat(prefixCls, "-link-title"), _defineProperty({}, "".concat(prefixCls, "-link-title-active"), active));
    return /*#__PURE__*/React.createElement("div", {
      className: wrapperClassName
    }, /*#__PURE__*/React.createElement("a", {
      className: titleClassName,
      href: href,
      title: typeof title === 'string' ? title : '',
      target: target,
      onClick: handleClick
    }, title), children);
  });
};
export default AnchorLink;