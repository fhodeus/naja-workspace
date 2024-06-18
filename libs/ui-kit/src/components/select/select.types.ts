import type { ChangeEvent } from 'react';

export interface Option {
    label: string;
    value: string;
}

export interface FullSelectProps {
    className?: string;

    onChange?: (ev: ChangeEvent<HTMLSelectElement>) => void;

    compact?: boolean;
    disabled?: boolean;
    placeholder?: string;
    name?: string;
    value?: string;
    defaultValue?: string;
    options: Option[];
}
