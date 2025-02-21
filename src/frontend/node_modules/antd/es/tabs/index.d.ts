import type { TabsProps as RcTabsProps } from 'rc-tabs';
import * as React from 'react';
import type { SizeType } from '../config-provider/SizeContext';
import { TabPaneProps } from './TabPane';
export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';
export { TabPaneProps };
export interface TabsProps extends Omit<RcTabsProps, 'editable'> {
    type?: TabsType;
    size?: SizeType;
    hideAdd?: boolean;
    centered?: boolean;
    addIcon?: React.ReactNode;
    onEdit?: (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => void;
    children?: React.ReactNode;
}
declare function Tabs({ type, className, size: propSize, onEdit, hideAdd, centered, addIcon, children, items, animated, ...props }: TabsProps): React.JSX.Element;
declare namespace Tabs {
    var TabPane: React.FC<TabPaneProps>;
}
export default Tabs;
