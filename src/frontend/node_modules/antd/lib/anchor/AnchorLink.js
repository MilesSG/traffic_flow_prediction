"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _context = _interopRequireDefault(require("./context"));
var AnchorLink = function AnchorLink(props) {
  var _props$href = props.href,
    href = _props$href === void 0 ? '#' : _props$href,
    title = props.title,
    customizePrefixCls = props.prefixCls,
    children = props.children,
    className = props.className,
    target = props.target;
  var context = React.useContext(_context["default"]);
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
  return /*#__PURE__*/React.createElement(_configProvider.ConfigConsumer, null, function (_ref2) {
    var getPrefixCls = _ref2.getPrefixCls;
    var prefixCls = getPrefixCls('anchor', customizePrefixCls);
    var active = activeLink === href;
    var wrapperClassName = (0, _classnames["default"])("".concat(prefixCls, "-link"), className, (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-link-active"), active));
    var titleClassName = (0, _classnames["default"])("".concat(prefixCls, "-link-title"), (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-link-title-active"), active));
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
var _default = exports["default"] = AnchorLink;