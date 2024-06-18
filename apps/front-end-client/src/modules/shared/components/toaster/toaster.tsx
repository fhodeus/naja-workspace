import { useCallback } from 'react';
import { useToaster, toast as toastFn } from 'react-hot-toast';

import { createClassName, createStyleHelper } from '../../utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';
import { Toast } from '../toast/toast';

import styles from './toaster.module.scss';

const style = createStyleHelper(styles, 'toaster');

export interface IToasterProps {
    className?: string;
}

export const Toaster: FCWithChildren<IToasterProps> = ({ className }) => {
    const { toasts, handlers } = useToaster();
    const { startPause, endPause, calculateOffset, updateHeight } = handlers;
    const closeHandler = useCallback((identifier: string) => {
        toastFn.remove(identifier);
    }, []);

    const styleToast = useCallback(
        (visible: boolean, offset: number) => ({
            transition: 'all 0.5s ease-out',
            opacity: visible ? 1 : 0,
            transform: `translateY(${offset}px)`,
        }),
        [],
    );

    return (
        <div
            className={createClassName([className, style()])}
            onMouseEnter={startPause}
            onMouseLeave={endPause}
        >
            <div className={style('wrapper')}>
                <div className={style('container')}>
                    {toasts.map((toast) => {
                        const offset = calculateOffset(toast, {
                            reverseOrder: false,
                            gutter: 8,
                        });
                        // eslint-disable-next-line @arthurgeron/react-usememo/require-usememo
                        const ref = (el: HTMLDivElement) => {
                            if (el && !toast.height) {
                                const height = el.getBoundingClientRect().height;
                                updateHeight(toast.id, height);
                            }
                        };

                        const child =
                            typeof toast.message === 'function'
                                ? toast.message(toast)
                                : toast.message;

                        return (
                            <Toast
                                className={style('toast')}
                                key={toast.id}
                                ref={ref}
                                type={toast.type}
                                id={toast.id}
                                onClose={closeHandler}
                                isDismissed={!toast.visible}
                                style={styleToast(toast.visible, offset)}
                                isDismissible={toast.duration !== Infinity}
                                {...toast.ariaProps}
                            >
                                {child}
                            </Toast>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
