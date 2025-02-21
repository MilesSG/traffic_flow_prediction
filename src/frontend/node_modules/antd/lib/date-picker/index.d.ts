import type { Moment } from 'moment';
import type { PickerDateProps, PickerProps, RangePickerProps as BaseRangePickerProps } from './generatePicker';
export type DatePickerProps = PickerProps<Moment>;
export type MonthPickerProps = Omit<PickerDateProps<Moment>, 'picker'>;
export type WeekPickerProps = Omit<PickerDateProps<Moment>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Moment>;
declare const DatePicker: import("./generatePicker/interface").PickerComponentClass<PickerProps<Moment> & {
    status?: "" | "warning" | "error" | undefined;
    dropdownClassName?: string | undefined;
    popupClassName?: string | undefined;
}, unknown> & {
    WeekPicker: import("./generatePicker/interface").PickerComponentClass<Omit<PickerProps<Moment> & {
        status?: "" | "warning" | "error" | undefined;
        dropdownClassName?: string | undefined;
        popupClassName?: string | undefined;
    }, "picker">, unknown>;
    MonthPicker: import("./generatePicker/interface").PickerComponentClass<Omit<PickerProps<Moment> & {
        status?: "" | "warning" | "error" | undefined;
        dropdownClassName?: string | undefined;
        popupClassName?: string | undefined;
    }, "picker">, unknown>;
    YearPicker: import("./generatePicker/interface").PickerComponentClass<Omit<PickerProps<Moment> & {
        status?: "" | "warning" | "error" | undefined;
        dropdownClassName?: string | undefined;
        popupClassName?: string | undefined;
    }, "picker">, unknown>;
    RangePicker: import("./generatePicker/interface").PickerComponentClass<BaseRangePickerProps<Moment> & {
        dropdownClassName?: string | undefined;
        popupClassName?: string | undefined;
    }, unknown>;
    TimePicker: import("./generatePicker/interface").PickerComponentClass<Omit<Omit<import("rc-picker/lib/Picker").PickerTimeProps<Moment>, "locale" | "generateConfig" | "hideHeader" | "components"> & {
        locale?: import("./generatePicker").PickerLocale | undefined;
        size?: import("../button").ButtonSize;
        placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight" | undefined;
        bordered?: boolean | undefined;
        status?: "" | "warning" | "error" | undefined;
    } & {
        status?: "" | "warning" | "error" | undefined;
        dropdownClassName?: string | undefined;
        popupClassName?: string | undefined;
    }, "picker">, unknown>;
    QuarterPicker: import("./generatePicker/interface").PickerComponentClass<Omit<Omit<import("rc-picker/lib/Picker").PickerTimeProps<Moment>, "locale" | "generateConfig" | "hideHeader" | "components"> & {
        locale?: import("./generatePicker").PickerLocale | undefined;
        size?: import("../button").ButtonSize;
        placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight" | undefined;
        bordered?: boolean | undefined;
        status?: "" | "warning" | "error" | undefined;
    } & {
        status?: "" | "warning" | "error" | undefined;
        dropdownClassName?: string | undefined;
        popupClassName?: string | undefined;
    }, "picker">, unknown>;
};
export default DatePicker;
