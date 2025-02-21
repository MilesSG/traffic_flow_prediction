import * as React from 'react';
export declare function getKeyThenIncreaseKey(): number;
export interface ConfigOptions {
    top?: number;
    duration?: number;
    prefixCls?: string;
    getContainer?: () => HTMLElement;
    transitionName?: string;
    maxCount?: number;
    rtl?: boolean;
}
export interface ThenableArgument {
    (val: any): void;
}
export interface MessageType extends PromiseLike<any> {
    (): void;
}
declare const typeToIcon: {
    info: React.ForwardRefExoticComponent<Omit<import("@ant-design/icons/lib/components/AntdIcon").AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;
    success: React.ForwardRefExoticComponent<Omit<import("@ant-design/icons/lib/components/AntdIcon").AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;
    error: React.ForwardRefExoticComponent<Omit<import("@ant-design/icons/lib/components/AntdIcon").AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;
    warning: React.ForwardRefExoticComponent<Omit<import("@ant-design/icons/lib/components/AntdIcon").AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;
    loading: React.ForwardRefExoticComponent<Omit<import("@ant-design/icons/lib/components/AntdIcon").AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;
};
export type NoticeType = keyof typeof typeToIcon;
export declare const typeList: ("success" | "warning" | "error" | "loading" | "info")[];
export interface ArgsProps {
    content: any;
    duration?: number;
    type?: NoticeType;
    prefixCls?: string;
    rootPrefixCls?: string;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    onClose?: () => void;
    icon?: React.ReactNode;
    key?: string | number;
    style?: React.CSSProperties;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
type ConfigContent = React.ReactNode;
type ConfigDuration = number | (() => void);
type JointContent = ConfigContent | ArgsProps;
export type ConfigOnClose = () => void;
export declare function attachTypeApi(originalApi: MessageApi, type: NoticeType): void;
export interface MessageInstance {
    info(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    success(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    error(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    warning(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    loading(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    open(args: ArgsProps): MessageType;
}
export interface MessageApi extends MessageInstance {
    warn(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    config(options: ConfigOptions): void;
    destroy(messageKey?: React.Key): void;
    useMessage(): [MessageInstance, React.ReactElement];
}
declare const _default: MessageApi;
export default _default;
