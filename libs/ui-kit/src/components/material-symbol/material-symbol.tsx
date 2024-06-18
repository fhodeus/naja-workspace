import { memo, type FunctionComponent } from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './material-symbol.module.scss';
import type { IIconProps} from './material-symbol.types';
import { IconSize } from './material-symbol.types';

const style = createStyleHelper(styles, 'material-symbol');

export const MaterialSymbol: FunctionComponent<IIconProps> = memo(
    ({ name, onClick, size = IconSize.MEDIUM, color, className, fill = false, outlined }) => {
        const iconStyle = outlined ? 'outlined' : 'rounded';
        return (
            <div
                className={`material-symbols-${iconStyle} ${createClassName([
                    className,
                    style(undefined, { [size]: true, [color ?? '']: true, fill: fill }),
                ])}`}
                onClick={onClick}
            >
                {name}
            </div>
        );
    },
);
