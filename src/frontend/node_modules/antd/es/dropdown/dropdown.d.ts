import * as React from 'react';
import type { MenuProps } from '../menu';
import type { AdjustOverflow } from '../_util/placements';
import DropdownButton from './dropdown-button';
declare const Placements: ["topLeft", "topCenter", "topRight", "bottomLeft", "bottomCenter", "bottomRight", "top", "bottom"];
type Placement = typeof Placements[number];
type OverlayFunc = () => React.ReactElement;
type Align = {
    points?: [string, string];
    offset?: [number, number];
    targetOffset?: [number, number];
    overflow?: {
        adjustX?: boolean;
        adjustY?: boolean;
    };
    useCssRight?: boolean;
    useCssBottom?: boolean;
    useCssTransform?: boolean;
};
export type DropdownArrowOptions = {
    pointAtCenter?: boolean;
};
export interface DropdownProps {
    menu?: MenuProps;
    autoFocus?: boolean;
    arrow?: boolean | DropdownArrowOptions;
    trigger?: ('click' | 'hover' | 'contextMenu')[];
    dropdownRender?: (originNode: React.ReactNode) => React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
    disabled?: boolean;
    destroyPopupOnHide?: boolean;
    align?: Align;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    prefixCls?: string;
    className?: string;
    transitionName?: string;
    placement?: Placement;
    overlayClassName?: string;
    overlayStyle?: React.CSSProperties;
    forceRender?: boolean;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    openClassName?: string;
    children?: React.ReactNode;
    autoAdjustOverflow?: boolean | AdjustOverflow;
    /** @deprecated Please use `menu` instead */
    overlay?: React.ReactElement | OverlayFunc;
    /** @deprecated Please use `open` instead */
    visible?: boolean;
    /** @deprecated Please use `onOpenChange` instead */
    onVisibleChange?: (open: boolean) => void;
}
type CompoundedComponent = React.FC<DropdownProps> & {
    Button: typeof DropdownButton;
};
declare const Dropdown: CompoundedComponent;
export default Dropdown;
