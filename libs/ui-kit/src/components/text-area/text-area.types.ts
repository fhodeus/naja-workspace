import type { ComponentProps, FunctionComponent } from 'react';

export interface ITextAreaProps {
    className?: string;

    compact?: boolean;
    disabled?: boolean;
    placeholder?: string;
    name?: string;
    value?: string;
    defaultValue?: string;
    autoFocus?: boolean;
    autoComplete?: string;
    maxLength?: number;
    minLength?: number;
    type?: 'text' | 'password' | 'number' | 'email' | 'date' | 'time';
    testid?: string;
}

export type FullTextAreaProps = ComponentProps<FunctionComponent<ITextAreaProps>>;