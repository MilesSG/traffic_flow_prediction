import type { DrawerProps as RcDrawerProps } from 'rc-drawer';
import * as React from 'react';
declare const SizeTypes: ["default", "large"];
type sizeType = typeof SizeTypes[number];
export interface PushState {
    distance: string | number;
}
export interface DrawerProps extends RcDrawerProps {
    size?: sizeType;
    closable?: boolean;
    closeIcon?: React.ReactNode;
    /** Wrapper dom node style of header and body */
    drawerStyle?: React.CSSProperties;
    headerStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    footerStyle?: React.CSSProperties;
    title?: React.ReactNode;
    /**
     * @deprecated `visible` is deprecated which will be removed in next major version. Please use
     *   `open` instead.
     */
    visible?: boolean;
    open?: boolean;
    footer?: React.ReactNode;
    extra?: React.ReactNode;
    /**
     * @deprecated `afterVisibleChange` is deprecated which will be removed in next major version.
     *   Please use `afterOpenChange` instead.
     */
    afterVisibleChange?: (visible: boolean) => void;
    afterOpenChange?: (open: boolean) => void;
}
declare function Drawer(props: DrawerProps): React.JSX.Element;
declare namespace Drawer {
    var displayName: string;
}
export default Drawer;
