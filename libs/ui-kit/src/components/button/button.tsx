import { createClassName, createStyleHelper } from '../../utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';
import { MaterialSymbol } from '../components';

import styles from './button.module.scss';
import type { IButtonProps } from './button.types';
import { ButtonVariant, ButtonSize } from './button.types';

const style = createStyleHelper(styles, 'button');

export const Button: FCWithChildren<IButtonProps> = ({
    className,
    size = ButtonSize.MEDIUM,
    hollow,
    loading = false,
    warning,
    rounding = false,
    disabled,
    variant = ButtonVariant.DEFAULT,
    children,
    type = 'button',
    onClick,
    hasIcon = false,
    ...restProps
}) => {
    const classes = createClassName([
        className,
        style('', {
            [size]: true,
            'hollow': !!hollow,
            'loading': !!loading,
            'warning': !!warning,
            'rounded-none': rounding,
            'disabled': !!disabled,
            [variant]: true,
            'has-icon': !!hasIcon,
        }),
    ]);

    const buttonLoader = (
        <div className={style('loader')}>
            <MaterialSymbol name="pending" />{' '}
        </div>
    );

    return (
        <button
            type={type}
            onClick={onClick}
            className={classes}
            disabled={disabled}
            {...restProps}
        >
            {buttonLoader}
            {children}
        </button>
    );
};
