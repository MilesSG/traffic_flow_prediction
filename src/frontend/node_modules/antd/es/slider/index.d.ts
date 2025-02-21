import type { SliderProps as RcSliderProps } from 'rc-slider';
import * as React from 'react';
import type { TooltipPlacement } from '../tooltip';
export type SliderMarks = RcSliderProps['marks'];
interface HandleGeneratorInfo {
    value?: number;
    dragging?: boolean;
    index: number;
}
export type HandleGeneratorFn = (config: {
    tooltipPrefixCls?: string;
    prefixCls?: string;
    info: HandleGeneratorInfo;
}) => React.ReactElement;
export interface SliderTooltipProps {
    prefixCls?: string;
    open?: boolean;
    placement?: TooltipPlacement;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    formatter?: null | ((value?: number) => React.ReactNode);
}
export interface SliderBaseProps {
    prefixCls?: string;
    /**
     * @deprecated `tooltipPrefixCls` is deprecated which will be removed in next major version.
     *   Please use `tooltip.prefixCls` instead.
     */
    tooltipPrefixCls?: string;
    reverse?: boolean;
    min?: number;
    max?: number;
    step?: null | number;
    marks?: SliderMarks;
    dots?: boolean;
    included?: boolean;
    disabled?: boolean;
    vertical?: boolean;
    /**
     * @deprecated `tipFormatter` is deprecated which will be removed in next major version. Please
     *   use `tooltip.formatter` instead.
     */
    tipFormatter?: null | ((value?: number) => React.ReactNode);
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    /**
     * @deprecated `tooltipVisible` is deprecated which will be removed in next major version. Please
     *   use `tooltip.open` instead.
     */
    tooltipVisible?: boolean;
    /**
     * @deprecated `tooltipPlacement` is deprecated which will be removed in next major version.
     *   Please use `tooltip.placement` instead.
     */
    tooltipPlacement?: TooltipPlacement;
    tooltip?: SliderTooltipProps;
    /**
     * @deprecated `getTooltipPopupContainer` is deprecated which will be removed in next major
     *   version. Please use `tooltip.getPopupContainer` instead.
     */
    getTooltipPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    autoFocus?: boolean;
}
export interface SliderSingleProps extends SliderBaseProps {
    range?: false;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    onAfterChange?: (value: number) => void;
    handleStyle?: React.CSSProperties;
    trackStyle?: React.CSSProperties;
    railStyle?: React.CSSProperties;
}
export interface SliderRangeProps extends SliderBaseProps {
    range: true | SliderRange;
    value?: [number, number];
    defaultValue?: [number, number];
    onChange?: (value: [number, number]) => void;
    onAfterChange?: (value: [number, number]) => void;
    handleStyle?: React.CSSProperties[];
    trackStyle?: React.CSSProperties[];
    railStyle?: React.CSSProperties;
}
interface SliderRange {
    draggableTrack?: boolean;
}
export type Opens = {
    [index: number]: boolean;
};
declare const Slider: React.ForwardRefExoticComponent<(SliderSingleProps | SliderRangeProps) & React.RefAttributes<unknown>>;
export default Slider;
