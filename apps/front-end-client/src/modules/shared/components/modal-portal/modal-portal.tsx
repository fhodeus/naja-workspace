import ReactDOM from 'react-dom';

import type { FCWithChildren } from '../../utils/component.interface';
import { ModalContainer } from '../modal-container/modal-container';

export interface IModalPortal {
    isOpen: boolean;
    onClose?: () => void;
}

export const ModalPortal: FCWithChildren<IModalPortal> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <ModalContainer onClose={onClose}>{children}</ModalContainer>,
        document.body,
    );
};
