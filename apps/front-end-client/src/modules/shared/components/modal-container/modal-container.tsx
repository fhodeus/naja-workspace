import { useCallback, useRef, useEffect } from 'react';

import { createStyleHelper } from '../../utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';

import styles from './modal-container.module.scss';

const style = createStyleHelper(styles, 'modal-container');

interface IModalContainerProps {
    onClose?: () => void;
}

export const ModalContainer: FCWithChildren<IModalContainerProps> = ({ children, onClose }) => {
    const ref = useRef(null);

    const onClickOffModal = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (event.target === ref.current) {
                onClose?.();
            }
        },
        [onClose],
    );

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();

                onClose?.();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [onClose]);

    return (
        <div ref={ref} onClick={onClickOffModal} className={style()}>
            {children}
        </div>
    );
};
