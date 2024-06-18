import { createClassName, createStyleHelper } from '../../utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';

import styles from './badge.module.scss';
import { BadgeSize, BadgeType, type IBadgeProps } from './badge.types';

const style = createStyleHelper(styles, 'badge');

export const Badge: FCWithChildren<IBadgeProps> = ({
    className,
    children,
    icon,
    type = BadgeType.INFO,
    pill = false,
    size = BadgeSize.HEADING_5,
}) => {
    return (
        <div
            className={createClassName([
                style(undefined, {
                    [type]: true,
                    [size]: true,
                    'pill': pill,
                    'only-icon': !!icon && !children,
                }),
                className,
            ])}
        >
            {icon} {children}
        </div>
    );
};
