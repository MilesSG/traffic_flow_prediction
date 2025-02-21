import * as React from 'react';
export type Unit = {
    label: React.ReactText;
    value: number;
    disabled: boolean;
};
export type TimeUnitColumnProps = {
    prefixCls?: string;
    units?: Unit[];
    value?: number;
    active?: boolean;
    hideDisabledOptions?: boolean;
    onSelect?: (value: number) => void;
};
declare function TimeUnitColumn(props: TimeUnitColumnProps): React.JSX.Element;
export default TimeUnitColumn;
