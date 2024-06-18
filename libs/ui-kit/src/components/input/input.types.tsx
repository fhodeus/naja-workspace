import type { ChangeEvent, ComponentProps, FormEvent, FunctionComponent } from 'react';

export interface IInputProps {
    className?: string;

    onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
  
    onInput?: (ev: FormEvent<HTMLInputElement>) => void;

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

export type FullInputProps = ComponentProps<FunctionComponent<IInputProps>>;
