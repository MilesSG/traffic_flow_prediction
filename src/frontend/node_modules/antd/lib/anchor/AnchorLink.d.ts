import * as React from 'react';
export interface AnchorLinkProps {
    prefixCls?: string;
    href: string;
    target?: string;
    title: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}
declare const AnchorLink: React.FC<AnchorLinkProps>;
export default AnchorLink;
