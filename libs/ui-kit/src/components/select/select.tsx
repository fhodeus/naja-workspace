import { forwardRef } from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';
import { MaterialSymbol } from '../material-symbol/material-symbol';

import styles from './select.module.scss';
import type { FullSelectProps } from './select.types';

const style = createStyleHelper(styles, 'select');

export const Select = forwardRef<HTMLSelectElement, FullSelectProps>(
    (
        {
            className,
            onChange,
            placeholder,
            name,
            value,
            defaultValue,
            compact,
            disabled = false,
            options,
        },
        ref,
    ) => {
        return (
            <>
                <select
                    ref={ref}
                    className={createClassName([
                        className,
                        style(undefined, { compact: !!compact, disabled: !!disabled }),
                    ])}
                    placeholder={placeholder}
                    disabled={disabled}
                    name={name}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                >
                    {options.map((option, i) => (
                        <option value={option.value} className={style('option')} key={i}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <MaterialSymbol className={style('expand-more')} name="expand_more" />
            </>
        );
    },
);
