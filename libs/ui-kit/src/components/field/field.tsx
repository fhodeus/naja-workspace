import { useEffect, useState } from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';

import styles from './field.module.scss';
import type { IFieldProps } from './field.types';

const style = createStyleHelper(styles, 'field');

export const Field: FCWithChildren<IFieldProps> = ({
    className,
    children,
    label,
    htmlFor,
    message,
    info,
    infoOpen,
    hasError,
    hasSuccess,
    variant,
    dark = false,
    light = false,
}) => {
    const [isInfoOpen, setIsInfoOpen] = useState(infoOpen ?? false);

    useEffect(() => {
        setIsInfoOpen(isInfoOpen);
    }, [isInfoOpen]);

    return (
        <div
            className={createClassName([
                className,
                style(undefined, {
                    'has-info-shown': !!info && isInfoOpen,
                    'has-error': hasError ?? false,
                    'has-success': hasSuccess ?? false,
                    ...(variant ? { [variant]: true } : {}),
                }),
            ])}
            data-testid="field"
        >
            {label ? (
                <label
                    className={style('label', {
                        dark,
                        light,
                    })}
                    htmlFor={htmlFor}
                >
                    {label}
                </label>
            ) : null}
            <div className={style('input')}>
                <div className={style('field-wrapper')}>
                    {children}

                    {info && !message ? <div>faInfoCircle</div> : null}
                </div>

                {message ? (
                    <label data-testid={`label-message.${message}`} className={style('message')}>
                        {message}
                    </label>
                ) : null}

                {info && isInfoOpen && !message ? (
                    <div className={style('info')}>{info}</div>
                ) : null}
            </div>
        </div>
    );
};
