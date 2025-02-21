import * as React from 'react';
import Summary from './Summary';
import type { ColumnType, StickyOffsets } from '../interface';
declare type FlattenColumns<RecordType> = readonly (ColumnType<RecordType> & {
    scrollbar?: boolean;
})[];
export interface FooterProps<RecordType> {
    children: React.ReactNode;
    stickyOffsets: StickyOffsets;
    flattenColumns: FlattenColumns<RecordType>;
}
declare function Footer<RecordType>({ children, stickyOffsets, flattenColumns }: FooterProps<RecordType>): JSX.Element;
export default Footer;
export declare const FooterComponents: typeof Summary;
