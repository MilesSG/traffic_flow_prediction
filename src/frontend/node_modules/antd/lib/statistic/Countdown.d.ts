import * as React from 'react';
import type { StatisticProps } from './Statistic';
import type { countdownValueType } from './utils';
export interface CountdownProps extends StatisticProps {
    value?: countdownValueType;
    format?: string;
    onFinish?: () => void;
    onChange?: (value?: countdownValueType) => void;
}
declare const _default: React.NamedExoticComponent<CountdownProps>;
export default _default;
