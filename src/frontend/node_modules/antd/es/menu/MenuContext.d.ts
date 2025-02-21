/// <reference types="react" />
import type { DirectionType } from '../config-provider';
export type MenuTheme = 'light' | 'dark';
export interface MenuContextProps {
    prefixCls: string;
    inlineCollapsed: boolean;
    antdMenuTheme?: MenuTheme;
    direction?: DirectionType;
    firstLevel: boolean;
}
declare const MenuContext: import("react").Context<MenuContextProps>;
export default MenuContext;
