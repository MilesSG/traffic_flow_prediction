import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import classNames from 'classnames';
import * as React from 'react';
var Element = function Element(props) {
  var prefixCls = props.prefixCls,
    className = props.className,
    style = props.style,
    size = props.size,
    shape = props.shape;
  var sizeCls = classNames(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-lg"), size === 'large'), "".concat(prefixCls, "-sm"), size === 'small'));
  var shapeCls = classNames(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-circle"), shape === 'circle'), "".concat(prefixCls, "-square"), shape === 'square'), "".concat(prefixCls, "-round"), shape === 'round'));
  var sizeStyle = React.useMemo(function () {
    return typeof size === 'number' ? {
      width: size,
      height: size,
      lineHeight: "".concat(size, "px")
    } : {};
  }, [size]);
  return /*#__PURE__*/React.createElement("span", {
    className: classNames(prefixCls, sizeCls, shapeCls, className),
    style: _extends(_extends({}, sizeStyle), style)
  });
};
export default Element;