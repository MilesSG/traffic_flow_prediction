import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import classNames from 'classnames';
import { composeRef } from "rc-util/es/ref";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';
var Typography = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var customizePrefixCls = _a.prefixCls,
    _a$component = _a.component,
    Component = _a$component === void 0 ? 'article' : _a$component,
    className = _a.className,
    setContentRef = _a.setContentRef,
    children = _a.children,
    typographyDirection = _a.direction,
    restProps = __rest(_a, ["prefixCls", "component", "className", "setContentRef", "children", "direction"]);
  var _React$useContext = React.useContext(ConfigContext),
    getPrefixCls = _React$useContext.getPrefixCls,
    contextDirection = _React$useContext.direction;
  var direction = typographyDirection !== null && typographyDirection !== void 0 ? typographyDirection : contextDirection;
  var mergedRef = ref;
  if (setContentRef) {
    process.env.NODE_ENV !== "production" ? warning(false, 'Typography', '`setContentRef` is deprecated. Please use `ref` instead.') : void 0;
    mergedRef = composeRef(ref, setContentRef);
  }
  var prefixCls = getPrefixCls('typography', customizePrefixCls);
  var componentClassName = classNames(prefixCls, _defineProperty({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  return (
    /*#__PURE__*/
    // @ts-expect-error: Expression produces a union type that is too complex to represent.
    React.createElement(Component, _extends({
      className: componentClassName,
      ref: mergedRef
    }, restProps), children)
  );
});
if (process.env.NODE_ENV !== 'production') {
  Typography.displayName = 'Typography';
}
// es default export should use const instead of let
export default Typography;