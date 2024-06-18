import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './gap.module.scss';
import type { IGapProps } from './gap.types';

const style = createStyleHelper(styles, 'gap');

export const Gap = forwardRef<HTMLDivElement, PropsWithChildren<IGapProps>>(
    ({ className, direction = 'vertical', children, size, align }, ref) => {
        return (
            <div
                ref={ref}
                className={createClassName([
                    className,
                    style(undefined, {
                        [size ?? '']: true,
                        [direction]: true,
                        [`align-${align ?? ''}`]: true
                    }),
                ])}
            >
                {children}
            </div>
        );
    },
);
