import * as React from 'react';
import type { SizeType } from '../config-provider/SizeContext';
import Group from './button-group';
declare const ButtonTypes: ["default", "primary", "ghost", "dashed", "link", "text"];
export type ButtonType = typeof ButtonTypes[number];
declare const ButtonShapes: ["default", "circle", "round"];
export type ButtonShape = typeof ButtonShapes[number];
declare const ButtonHTMLTypes: ["submit", "button", "reset"];
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];
export type LegacyButtonType = ButtonType | 'danger';
export declare function convertLegacyProps(type?: LegacyButtonType): ButtonProps;
export interface BaseButtonProps {
    type?: ButtonType;
    icon?: React.ReactNode;
    /**
     * Shape of Button
     *
     * @default default
     */
    shape?: ButtonShape;
    size?: SizeType;
    disabled?: boolean;
    loading?: boolean | {
        delay?: number;
    };
    prefixCls?: string;
    className?: string;
    ghost?: boolean;
    danger?: boolean;
    block?: boolean;
    children?: React.ReactNode;
}
export type AnchorButtonProps = {
    href: string;
    target?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps & Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;
export type NativeButtonProps = {
    htmlType?: ButtonHTMLType;
    onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps & Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;
export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;
type CompoundedComponent = React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> & {
    Group: typeof Group;
};
declare const Button: CompoundedComponent;
export default Button;
