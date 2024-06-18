import { createStyleHelper } from '../../utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';

import styles from './tooltip.module.scss';
import type { TooltipProps } from './tooltip.types';

const style = createStyleHelper(styles, 'tooltip');

export const Tooltip: FCWithChildren<TooltipProps> = ({ children, direction, content }) => {    
    return (
        <div className={style()}>
            {children}
            <div className={style('tooltip-content', { [direction]: !!direction })}>{content}</div>
        </div>
    );
};
