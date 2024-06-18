import { forwardRef } from 'react';
import type { ComponentProps, FunctionComponent, ChangeEvent, FocusEvent } from 'react';
import { useIntl } from 'react-intl';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './radio.module.scss';

const style = createStyleHelper(styles, 'radio');

export interface IRadioProps {
    className?: string;

    onChange?: (ev: ChangeEvent) => void;
    onBlur?: (ev: FocusEvent) => void;

    name?: string;
    label: string | JSX.Element;

    defaultValue?: boolean;
    value?: string;
    bold?: boolean;
}

export type FullRadioProps = ComponentProps<FunctionComponent<IRadioProps>>;

export const Radio = forwardRef<HTMLInputElement, FullRadioProps>(
    ({ className, onChange, onBlur, name, label, defaultValue, value, bold = false }, ref) => {
        const intl = useIntl();

        return (
            <label
                className={createClassName([
                    className,
                    style(undefined, {
                        bold,
                    }),
                ])}
            >
                <input
                    className={style('field')}
                    ref={ref}
                    type={'radio'}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    defaultChecked={defaultValue}
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
