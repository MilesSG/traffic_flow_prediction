import * as React from 'react';
import type { PanelSharedProps, PanelMode } from '../../interface';
export type YearPanelProps<DateType> = {
    sourceMode: PanelMode;
} & PanelSharedProps<DateType>;
export declare const YEAR_DECADE_COUNT = 10;
declare function YearPanel<DateType>(props: YearPanelProps<DateType>): React.JSX.Element;
export default YearPanel;
