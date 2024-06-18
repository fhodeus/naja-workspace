import { forwardRef } from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './text-area.module.scss';
import type { FullTextAreaProps } from './text-area.types';

const style = createStyleHelper(styles, 'text-area');

export const TextArea = forwardRef<HTMLTextAreaElement, FullTextAreaProps>(
    ({ className, placeholder, name, disabled, ...props }, ref) => {
        return (
            <textarea
                {...props}
                ref={ref}
                className={createClassName([className, style(undefined, { disabled: !!disabled })])}
                placeholder={placeholder}
                name={name}
            />
        );
    },
);
