import * as React from 'react';
import type { RenderEmptyHandler } from '../config-provider';
import type { InputStatus } from '../_util/statusUtils';
import type { PaginationType } from './interface';
import type { TransferListProps } from './list';
import List from './list';
import type { TransferListBodyProps } from './ListBody';
import Search from './search';
export { TransferListProps } from './list';
export { TransferOperationProps } from './operation';
export { TransferSearchProps } from './search';
export type TransferDirection = 'left' | 'right';
export interface RenderResultObject {
    label: React.ReactElement;
    value: string;
}
export type RenderResult = React.ReactElement | RenderResultObject | string | null;
export interface TransferItem {
    key?: string;
    title?: string;
    description?: string;
    disabled?: boolean;
    [name: string]: any;
}
export type KeyWise<T> = T & {
    key: string;
};
export type KeyWiseTransferItem = KeyWise<TransferItem>;
type TransferRender<RecordType> = (item: RecordType) => RenderResult;
export interface ListStyle {
    direction: TransferDirection;
}
export type SelectAllLabel = React.ReactNode | ((info: {
    selectedCount: number;
    totalCount: number;
}) => React.ReactNode);
export interface TransferLocale {
    titles?: React.ReactNode[];
    notFoundContent?: React.ReactNode | React.ReactNode[];
    searchPlaceholder: string;
    itemUnit: string;
    itemsUnit: string;
    remove?: string;
    selectAll?: string;
    selectCurrent?: string;
    selectInvert?: string;
    removeAll?: string;
    removeCurrent?: string;
}
export interface TransferProps<RecordType> {
    prefixCls?: string;
    className?: string;
    disabled?: boolean;
    dataSource?: RecordType[];
    targetKeys?: string[];
    selectedKeys?: string[];
    render?: TransferRender<RecordType>;
    onChange?: (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => void;
    onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
    style?: React.CSSProperties;
    listStyle?: ((style: ListStyle) => React.CSSProperties) | React.CSSProperties;
    operationStyle?: React.CSSProperties;
    titles?: React.ReactNode[];
    operations?: string[];
    showSearch?: boolean;
    filterOption?: (inputValue: string, item: RecordType) => boolean;
    locale?: Partial<TransferLocale>;
    footer?: (props: TransferListProps<RecordType>, info?: {
        direction: TransferDirection;
    }) => React.ReactNode;
    rowKey?: (record: RecordType) => string;
    onSearch?: (direction: TransferDirection, value: string) => void;
    onScroll?: (direction: TransferDirection, e: React.SyntheticEvent<HTMLUListElement>) => void;
    children?: (props: TransferListBodyProps<RecordType>) => React.ReactNode;
    showSelectAll?: boolean;
    selectAllLabels?: SelectAllLabel[];
    oneWay?: boolean;
    pagination?: PaginationType;
    status?: InputStatus;
}
interface TransferState {
    sourceSelectedKeys: string[];
    targetSelectedKeys: string[];
}
declare class Transfer<RecordType extends TransferItem = TransferItem> extends React.Component<TransferProps<RecordType>, TransferState> {
    static List: typeof List;
    static Operation: ({ disabled, moveToLeft, moveToRight, leftArrowText, rightArrowText, leftActive, rightActive, className, style, direction, oneWay, }: import("./operation").TransferOperationProps) => React.JSX.Element;
    static Search: typeof Search;
    static getDerivedStateFromProps<T>({ selectedKeys, targetKeys, pagination, children, }: TransferProps<T>): {
        sourceSelectedKeys: string[];
        targetSelectedKeys: string[];
    } | null;
    separatedDataSource: {
        leftDataSource: RecordType[];
        rightDataSource: RecordType[];
    } | null;
    constructor(props: TransferProps<RecordType>);
    setStateKeys: (direction: TransferDirection, keys: string[] | ((prevKeys: string[]) => string[])) => void;
    getTitles(transferLocale: TransferLocale): React.ReactNode[];
    getLocale: (transferLocale: TransferLocale, renderEmpty: RenderEmptyHandler) => {
        titles?: React.ReactNode[] | undefined;
        notFoundContent: React.ReactNode;
        searchPlaceholder: string;
        itemUnit: string;
        itemsUnit: string;
        remove?: string | undefined;
        selectAll?: string | undefined;
        selectCurrent?: string | undefined;
        selectInvert?: string | undefined;
        removeAll?: string | undefined;
        removeCurrent?: string | undefined;
    };
    moveTo: (direction: TransferDirection) => void;
    moveToLeft: () => void;
    moveToRight: () => void;
    onItemSelectAll: (direction: TransferDirection, selectedKeys: string[], checkAll: boolean | 'replace') => void;
    onLeftItemSelectAll: (selectedKeys: string[], checkAll: boolean) => void;
    onRightItemSelectAll: (selectedKeys: string[], checkAll: boolean) => void;
    handleFilter: (direction: TransferDirection, e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLeftFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRightFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClear: (direction: TransferDirection) => void;
    handleLeftClear: () => void;
    handleRightClear: () => void;
    onItemSelect: (direction: TransferDirection, selectedKey: string, checked: boolean) => void;
    onLeftItemSelect: (selectedKey: string, checked: boolean) => void;
    onRightItemSelect: (selectedKey: string, checked: boolean) => void;
    onRightItemRemove: (selectedKeys: string[]) => void;
    handleScroll: (direction: TransferDirection, e: React.SyntheticEvent<HTMLUListElement>) => void;
    handleLeftScroll: (e: React.SyntheticEvent<HTMLUListElement>) => void;
    handleRightScroll: (e: React.SyntheticEvent<HTMLUListElement>) => void;
    handleSelectChange(direction: TransferDirection, holder: string[]): void;
    handleListStyle: (listStyle: TransferProps<RecordType>['listStyle'], direction: TransferDirection) => React.CSSProperties | undefined;
    separateDataSource(): {
        leftDataSource: KeyWise<RecordType>[];
        rightDataSource: KeyWise<RecordType>[];
    };
    render(): React.JSX.Element;
}
export default Transfer;
