import type { MenuItemProps as RcMenuItemProps } from 'rc-menu';
import * as React from 'react';
import type { SiderContextProps } from '../layout/Sider';
import type { MenuContextProps } from './MenuContext';
export interface MenuItemProps extends Omit<RcMenuItemProps, 'title'> {
    icon?: React.ReactNode;
    danger?: boolean;
    title?: React.ReactNode;
}
export default class MenuItem extends React.Component<MenuItemProps> {
    static contextType: React.Context<MenuContextProps>;
    context: MenuContextProps;
    renderItemChildren(inlineCollapsed: boolean): React.JSX.Element;
    renderItem: ({ siderCollapsed }: SiderContextProps) => React.JSX.Element;
    render(): React.JSX.Element;
}
