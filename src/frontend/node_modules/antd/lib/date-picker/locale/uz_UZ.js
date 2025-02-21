"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uz_UZ = _interopRequireDefault(require("rc-picker/lib/locale/uz_UZ"));
var _uz_UZ2 = _interopRequireDefault(require("../../time-picker/locale/uz_UZ"));
// Merge into a locale object
var locale = {
  lang: (0, _extends2["default"])({
    placeholder: 'Sanani tanlang',
    yearPlaceholder: 'Yilni tanlang',
    quarterPlaceholder: 'Chorakni tanlang',
    monthPlaceholder: 'Oyni tanlang',
    weekPlaceholder: 'Haftani tanlang',
    rangePlaceholder: ['Bosh sana', 'Oxirigi sana'],
    rangeYearPlaceholder: ['Yilning boshi', 'Yilning oxiri'],
    rangeMonthPlaceholder: ['Oyning boshi', 'Oyning oxiri'],
    rangeWeekPlaceholder: ['Haftaning boshi', 'Haftaning oxiri']
  }, _uz_UZ["default"]),
  timePickerLocale: (0, _extends2["default"])({}, _uz_UZ2["default"])
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
var _default = exports["default"] = locale;