import * as React from 'react';
import type { PanelSharedProps } from '../../interface';
export type WeekPanelProps<DateType> = PanelSharedProps<DateType>;
declare function WeekPanel<DateType>(props: WeekPanelProps<DateType>): React.JSX.Element;
export default WeekPanel;
