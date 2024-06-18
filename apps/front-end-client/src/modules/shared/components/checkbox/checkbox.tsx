import { forwardRef } from 'react';
import type { ComponentProps, FunctionComponent, ChangeEvent, FocusEvent } from 'react';
import { useIntl } from 'react-intl';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './checkbox.module.scss';

const style = createStyleHelper(styles, 'checkbox');

export interface ICheckboxProps {
    className?: string;

    onChange?: (ev: ChangeEvent) => void;
    onBlur?: (ev: FocusEvent) => void;

    name?: string;
    label: string | JSX.Element;

    defaultValue?: boolean;
    value?: boolean;
}

export type FullCheckboxProps = ComponentProps<FunctionComponent<ICheckboxProps>>;

export const Checkbox = forwardRef<HTMLInputElement, FullCheckboxProps>(
    ({ className, onChange, onBlur, name, label, defaultValue, value }, ref) => {
        const intl = useIntl();

        return (
            <label className={createClassName([className, style()])}>
                <input
                    className={style('field')}
                    ref={ref}
                    type={'checkbox'}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    defaultChecked={defaultValue}
                    checked={value}
                />
                {typeof label === 'string'
                    ? intl.formatMessage({
                          id: label,
                          defaultMessage: label,
                      })
                    : label}
            </label>
        );
    },
);
