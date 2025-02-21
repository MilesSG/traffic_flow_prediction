import _typeof from "@babel/runtime/helpers/esm/typeof";
import _extends from "@babel/runtime/helpers/esm/extends";
import { getTransitionName } from '../../_util/motion';
var motion = {
  motionAppear: false,
  motionEnter: true,
  motionLeave: true
};
export default function useAnimateConfig(prefixCls) {
  var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    inkBar: true,
    tabPane: false
  };
  var mergedAnimated;
  if (animated === false) {
    mergedAnimated = {
      inkBar: false,
      tabPane: false
    };
  } else if (animated === true) {
    mergedAnimated = {
      inkBar: true,
      tabPane: true
    };
  } else {
    mergedAnimated = _extends({
      inkBar: true
    }, _typeof(animated) === 'object' ? animated : {});
  }
  if (mergedAnimated.tabPane) {
    mergedAnimated.tabPaneMotion = _extends(_extends({}, motion), {
      motionName: getTransitionName(prefixCls, 'switch')
    });
  }
  return mergedAnimated;
}