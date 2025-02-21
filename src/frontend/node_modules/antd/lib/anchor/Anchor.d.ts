import * as React from 'react';
export type AnchorContainer = HTMLElement | Window;
export interface AnchorProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    offsetTop?: number;
    bounds?: number;
    affix?: boolean;
    showInkInFixed?: boolean;
    getContainer?: () => AnchorContainer;
    /** Return customize highlight anchor */
    getCurrentAnchor?: (activeLink: string) => string;
    onClick?: (e: React.MouseEvent<HTMLElement>, link: {
        title: React.ReactNode;
        href: string;
    }) => void;
    /** Scroll to target offset value, if none, it's offsetTop prop value or 0. */
    targetOffset?: number;
    /** Listening event when scrolling change active link */
    onChange?: (currentActiveLink: string) => void;
}
export interface AnchorState {
    activeLink: null | string;
}
export interface AnchorDefaultProps extends AnchorProps {
    prefixCls: string;
    affix: boolean;
    showInkInFixed: boolean;
    getContainer: () => AnchorContainer;
}
export interface AntAnchor {
    registerLink: (link: string) => void;
    unregisterLink: (link: string) => void;
    activeLink: string | null;
    scrollTo: (link: string) => void;
    onClick?: (e: React.MouseEvent<HTMLElement>, link: {
        title: React.ReactNode;
        href: string;
    }) => void;
}
declare const Anchor: React.FC<AnchorProps>;
export default Anchor;
