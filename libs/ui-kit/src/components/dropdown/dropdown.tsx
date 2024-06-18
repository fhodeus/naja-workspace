import { forwardRef } from 'react';
import type { ComponentProps, FunctionComponent, ChangeEvent, FocusEvent, FormEvent } from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './dropdown.module.scss';

const style = createStyleHelper(styles, 'dropdown');

export interface IDropdownProps {
    className?: string;

    onChange?: (ev: ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (ev: FocusEvent) => void;
    onInput?: (ev: FormEvent) => void;

    placeholder?: string;
    name?: string;
    large?: boolean;
    value?: string | number | readonly string[] | undefined;

    items?: Array<{
        value: string | number | readonly string[] | undefined;
        name: string;
        id?: string | number;
    }>;
}

export type FullDropdownProps = ComponentProps<FunctionComponent<IDropdownProps>>;

export const Dropdown = forwardRef<HTMLSelectElement, FullDropdownProps>(
    (
        { className, onChange, onBlur, onInput, placeholder, large = false, name, items, value },
        ref,
    ) => {
        return (
            <div className={createClassName([className, style(undefined)])}>
                <select
                    ref={ref}
                    className={style('field', { large })}
                    placeholder={placeholder}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    onInput={onInput}
                    defaultValue={placeholder ? '' : undefined}
                    value={value}
                >
                    {placeholder ? (
                        <option disabled value={''}>
                            {placeholder}
                        </option>
                    ) : null}
                    {items?.map(({ value, id, name: labelName }) => {
                        return (
                            <option key={id ?? labelName} value={value}>
                                {labelName}
                            </option>
                        );
                    })}
                </select>
                <>faAngleDown</>
            </div>
        );
    },
);
