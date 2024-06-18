export enum ButtonSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export enum Rounding {
    NONE = 'rounded-none',
}

export enum ButtonVariant {
    DEFAULT = 'default',
    LIGHT = 'light',
    ACTION = 'action',
    SUCCESS = 'success',
}

export interface IButtonProps {
    className?: string;
    size?: ButtonSize;
    hollow?: boolean;
    light?: boolean;
    warning?: boolean;
    outline?: boolean;
    rounding?: boolean;
    disabled?: boolean;
    variant?: ButtonVariant;
    href?: string;
    type?: 'submit' | 'button';
    loading?: boolean;
    rawHref?: boolean;
    hasIcon?: boolean;
    onClick?: () => void;
}
