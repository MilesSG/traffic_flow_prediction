import * as React from 'react';
import KeyCode from "rc-util/es/KeyCode";
var onKeyDown = function onKeyDown(event) {
  var keyCode = event.keyCode;
  if (keyCode === KeyCode.ENTER) {
    event.stopPropagation();
  }
};
var FilterDropdownMenuWrapper = function FilterDropdownMenuWrapper(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: props.className,
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    onKeyDown: onKeyDown
  }, props.children);
};
export default FilterDropdownMenuWrapper;