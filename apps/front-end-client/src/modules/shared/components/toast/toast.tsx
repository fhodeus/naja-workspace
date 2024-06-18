import { forwardRef, useCallback, useEffect } from 'react';
import type { PropsWithChildren, CSSProperties } from 'react';
import type { ToastType } from 'react-hot-toast';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './toast.module.scss';

const style = createStyleHelper(styles, 'toast');

export enum ToastTypes {
    DEFAULT = 'blank',
    SUCCESS = 'success',
    ERROR = 'error',
    LOADING = 'loading',
}

export interface IToastProps {
    isDismissible?: boolean;
    onClose?: (id: string) => void;
    type?: ToastType;
    id: string;
    style?: CSSProperties;
    className?: string;
    isDismissed?: boolean;
}

export const Toast = forwardRef<HTMLDivElement, PropsWithChildren<IToastProps>>(
    (
        {
            type = 'blank',
            id,
            children,
            style: cssProperties,
            isDismissed,
            onClose,
            isDismissible,
            className,
        },
        ref,
    ) => {
        const close = useCallback(() => onClose?.(id), [id, onClose]);

        useEffect(() => {
            if (!isDismissed) {
                return;
            }

            const timer = setTimeout(() => {
                close();
            }, 600);

            return () => {
                clearTimeout(timer);
            };
        }, [close, isDismissed]);

        return (
            <div
                ref={ref}
                className={createClassName([
                    style(undefined, {
                        success: type === 'success',
                        warning: type === 'loading',
                        error: type === 'error',
                    }),
                    className,
                ])}
                style={cssProperties}
            >
                {children}

                <div className={style('actions')}>
                    {isDismissible ? (
                        <button onClick={close} className={style('close')}>
                            {'<FontAwesomeIcon icon={faTimes} />'}
                        </button>
                    ) : null}
                </div>
            </div>
        );
    },
);
