import * as React from 'react';
import type { MonthCellRender } from './MonthBody';
import type { PanelSharedProps } from '../../interface';
export type MonthPanelProps<DateType> = {
    monthCellContentRender?: MonthCellRender<DateType>;
} & PanelSharedProps<DateType>;
declare function MonthPanel<DateType>(props: MonthPanelProps<DateType>): React.JSX.Element;
export default MonthPanel;
