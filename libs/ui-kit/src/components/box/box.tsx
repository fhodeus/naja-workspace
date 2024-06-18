import { createClassName, createStyleHelper } from '../../utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';

import styles from './box.module.scss';
import type { IBoxProps } from './box.types';

const style = createStyleHelper(styles, 'box');

export const Box: FCWithChildren<IBoxProps> = ({ className, children }) => {
    return <div className={createClassName([style(undefined, {}), className])}>{children}</div>;
};
