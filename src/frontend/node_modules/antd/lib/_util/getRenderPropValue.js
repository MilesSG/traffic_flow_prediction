"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRenderPropValue = void 0;
var getRenderPropValue = exports.getRenderPropValue = function getRenderPropValue(propValue) {
  if (!propValue) {
    return null;
  }
  if (typeof propValue === 'function') {
    return propValue();
  }
  return propValue;
};