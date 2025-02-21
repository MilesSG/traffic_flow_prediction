import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import toArray from "rc-util/es/Children/toArray";
import warning from '../_util/warning';
function filter(items) {
  return items.filter(function (item) {
    return item;
  });
}
export default function useLegacyItems(items, children) {
  if (items) {
    return items;
  }
  process.env.NODE_ENV !== "production" ? warning(!children, 'Steps', 'Step is deprecated. Please use `items` directly.') : void 0;
  var childrenItems = toArray(children).map(function (node) {
    if ( /*#__PURE__*/React.isValidElement(node)) {
      var props = node.props;
      var item = _extends({}, props);
      return item;
    }
    return null;
  });
  return filter(childrenItems);
}