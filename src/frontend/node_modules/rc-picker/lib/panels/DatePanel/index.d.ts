import * as React from 'react';
import type { DateBodyPassProps, DateRender } from './DateBody';
import type { PanelSharedProps } from '../../interface';
import type { KeyboardConfig } from '../../utils/uiUtil';
export type DatePanelProps<DateType> = {
    active?: boolean;
    dateRender?: DateRender<DateType>;
    panelName?: string;
    keyboardConfig?: KeyboardConfig;
} & PanelSharedProps<DateType> & DateBodyPassProps<DateType>;
declare function DatePanel<DateType>(props: DatePanelProps<DateType>): React.JSX.Element;
export default DatePanel;
