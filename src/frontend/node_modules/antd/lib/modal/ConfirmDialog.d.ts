import * as React from 'react';
import type { ModalFuncProps } from './Modal';
interface ConfirmDialogProps extends ModalFuncProps {
    afterClose?: () => void;
    close: (...args: any[]) => void;
    autoFocusButton?: null | 'ok' | 'cancel';
    rootPrefixCls: string;
    iconPrefixCls?: string;
}
declare const ConfirmDialog: (props: ConfirmDialogProps) => React.JSX.Element;
export default ConfirmDialog;
