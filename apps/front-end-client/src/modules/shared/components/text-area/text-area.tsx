import { forwardRef } from 'react';
import type { ComponentProps, FunctionComponent, ChangeEvent, FocusEvent, FormEvent } from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './text-area.module.scss';

const style = createStyleHelper(styles, 'text-area');

export interface ITextAreaProps {
    className: string;

    onChange?: (ev: ChangeEvent) => void;
    onBlur?: (ev: FocusEvent) => void;
    onInput?: (ev: FormEvent) => void;

    placeholder?: string;
    name?: string;
}

export type FullTextAreaProps = ComponentProps<FunctionComponent<ITextAreaProps>>;

export const TextArea = forwardRef<HTMLTextAreaElement, FullTextAreaProps>(
    ({ className, onChange, onBlur, onInput, placeholder, name }, ref) => {
        return (
            <textarea
                ref={ref}
                className={createClassName([className, style()])}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                onInput={onInput}
            />
        );
    },
);
