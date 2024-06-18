import { forwardRef } from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './input.module.scss';
import type { FullInputProps } from './input.types';

const style = createStyleHelper(styles, 'input');

export const Input = forwardRef<HTMLInputElement, FullInputProps>(
    (
        {
            className,
            onChange,
            onInput,
            placeholder,
            name,
            type,
            value,
            defaultValue,
            compact,
            autoFocus,
            autoComplete,
            disabled = false,
            maxLength,
            testid,
        },
        ref,
    ) => {
        return (
            <input
                ref={ref}
                className={createClassName([
                    className,
                    style(undefined, { compact: !!compact, disabled: !!disabled }),
                ])}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                name={name}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                onInput={onInput}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                maxLength={maxLength}
                data-testid={testid}
            />
        );
    },
);
