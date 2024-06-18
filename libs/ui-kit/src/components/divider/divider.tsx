import type { FunctionComponent } from 'react';
import { memo } from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './divider.module.scss';
import type { IDividerProps } from './divider.types';

const style = createStyleHelper(styles, 'divider');

export const Divider: FunctionComponent<IDividerProps> = memo(({ vertical = false, className }) => {
    return (
        <div
            className={createClassName([
                style(undefined, {
                    vertical,
                }),
                className,
            ])}
        />
    );
});
