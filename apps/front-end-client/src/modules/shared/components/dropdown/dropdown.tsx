import { forwardRef } from 'react';
import type { ComponentProps, FunctionComponent, ChangeEvent, FocusEvent, FormEvent } from 'react';
import { useIntl } from 'react-intl';

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
    dark?: boolean;
    large?: boolean;
    value?: string | number | readonly string[] | undefined;

    items?: Array<{
        value: string | number | readonly string[] | undefined;
        name: string;
        id?: string | number;
        translationKey?: string;
    }>;
}

export type FullDropdownProps = ComponentProps<FunctionComponent<IDropdownProps>>;

export const Dropdown = forwardRef<HTMLSelectElement, FullDropdownProps>(
    (
        {
            className,
            onChange,
            onBlur,
            onInput,
            placeholder,
            dark = false,
            large = false,
            name,
            items,
            value,
        },
        ref,
    ) => {
        const intl = useIntl();

        return (
            <div
                className={createClassName([
                    className,
                    style(undefined, {
                        dark,
                    }),
                ])}
            >
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
                            {intl.formatMessage({
                                id: placeholder,
                                defaultMessage: placeholder,
                            })}
                        </option>
                    ) : null}
                    {items?.map(({ value, id, name: labelName, translationKey }) => {
                        return (
                            <option key={id ?? labelName} value={value}>
                                {translationKey
                                    ? intl.formatMessage({
                                          id: translationKey,
                                          defaultMessage: labelName,
                                      })
                                    : labelName}
                            </option>
                        );
                    })}
                </select>
                <>faAngleDown</>
            </div>
        );
    },
);
