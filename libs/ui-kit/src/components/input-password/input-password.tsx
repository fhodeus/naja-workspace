import { forwardRef, useState } from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';
import { Input } from '../components';
import type { FullInputProps } from '../input/input.types';

import styles from './input-password.module.scss';

const style = createStyleHelper(styles, 'password-input');

export const InputPassword = forwardRef<HTMLInputElement, FullInputProps>((props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={createClassName([props.className, style(undefined)])}>
            <Input {...props} type={showPassword ? 'text' : 'password'} ref={ref} />
            <i
                className={style('password-icon', { show: showPassword, hide: !showPassword })}
                onClick={() => setShowPassword((e) => !e)}
            />
        </div>
    );
});
