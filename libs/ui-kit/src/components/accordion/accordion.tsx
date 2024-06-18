import { createClassName, createStyleHelper } from '../../utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';

import styles from './accordion.module.scss';
import type { IAccordion } from './accordion.types';

const style = createStyleHelper(styles, 'accordion');

export const Accordion: FCWithChildren<IAccordion> = ({ className, children, isOpen = true }) => {
    return (
        <div
            className={createClassName([
                style(undefined, {
                    'is-open': isOpen,
                }),
                className,
            ])}
        >
            <div className={style('inner')}>{children}</div>
        </div>
    );
};
