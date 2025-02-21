import * as React from 'react';
import type { ButtonProps, LegacyButtonType } from '../button/button';
import type { AbstractTooltipProps } from '../tooltip';
import type { RenderFunction } from '../_util/getRenderPropValue';
export interface PopconfirmProps extends AbstractTooltipProps {
    title: React.ReactNode | RenderFunction;
    disabled?: boolean;
    onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void;
    onCancel?: (e?: React.MouseEvent<HTMLElement>) => void;
    okText?: React.ReactNode;
    okType?: LegacyButtonType;
    cancelText?: React.ReactNode;
    okButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    showCancel?: boolean;
    icon?: React.ReactNode;
    /**
     * @deprecated `onVisibleChange` is deprecated which will be removed in next major version. Please
     *   use `onOpenChange` instead.
     */
    onVisibleChange?: (visible: boolean, e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>) => void;
    onOpenChange?: (open: boolean, e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>) => void;
}
export interface PopconfirmState {
    open?: boolean;
}
declare const Popconfirm: React.ForwardRefExoticComponent<PopconfirmProps & React.RefAttributes<unknown>>;
export default Popconfirm;
