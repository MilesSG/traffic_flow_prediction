import type { placements as Placements } from 'rc-tooltip/lib/placements';
import type { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';
import * as React from 'react';
import type { PresetColorType } from '../_util/colors';
import { AdjustOverflow, PlacementsConfig } from '../_util/placements';
import type { LiteralUnion } from '../_util/type';
export { AdjustOverflow, PlacementsConfig };
export type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
export interface TooltipAlignConfig {
    points?: [string, string];
    offset?: [number | string, number | string];
    targetOffset?: [number | string, number | string];
    overflow?: {
        adjustX: boolean;
        adjustY: boolean;
    };
    useCssRight?: boolean;
    useCssBottom?: boolean;
    useCssTransform?: boolean;
}
interface LegacyTooltipProps extends Partial<Omit<RcTooltipProps, 'children' | 'visible' | 'defaultVisible' | 'onVisibleChange' | 'afterVisibleChange'>> {
    /**
     * @deprecated `visible` is deprecated which will be removed in next major version. Please use
     *   `open` instead.
     */
    visible?: RcTooltipProps['visible'];
    open?: RcTooltipProps['visible'];
    /**
     * @deprecated `defaultVisible` is deprecated which will be removed in next major version. Please
     *   use `defaultOpen` instead.
     */
    defaultVisible?: RcTooltipProps['defaultVisible'];
    defaultOpen?: RcTooltipProps['defaultVisible'];
    /**
     * @deprecated `onVisibleChange` is deprecated which will be removed in next major version. Please
     *   use `onOpenChange` instead.
     */
    onVisibleChange?: RcTooltipProps['onVisibleChange'];
    onOpenChange?: RcTooltipProps['onVisibleChange'];
    /**
     * @deprecated `afterVisibleChange` is deprecated which will be removed in next major version.
     *   Please use `afterOpenChange` instead.
     */
    afterVisibleChange?: RcTooltipProps['afterVisibleChange'];
    afterOpenChange?: RcTooltipProps['afterVisibleChange'];
}
export interface AbstractTooltipProps extends LegacyTooltipProps {
    style?: React.CSSProperties;
    className?: string;
    color?: LiteralUnion<PresetColorType, string>;
    placement?: TooltipPlacement;
    builtinPlacements?: typeof Placements;
    openClassName?: string;
    arrowPointAtCenter?: boolean;
    autoAdjustOverflow?: boolean | AdjustOverflow;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    children?: React.ReactNode;
}
export type RenderFunction = () => React.ReactNode;
export interface TooltipPropsWithOverlay extends AbstractTooltipProps {
    title?: React.ReactNode | RenderFunction;
    overlay?: React.ReactNode | RenderFunction;
}
export interface TooltipPropsWithTitle extends AbstractTooltipProps {
    title: React.ReactNode | RenderFunction;
    overlay?: React.ReactNode | RenderFunction;
}
export declare type TooltipProps = TooltipPropsWithTitle | TooltipPropsWithOverlay;
declare const Tooltip: React.ForwardRefExoticComponent<TooltipProps & React.RefAttributes<unknown>>;
export default Tooltip;
