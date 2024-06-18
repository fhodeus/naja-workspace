export interface IIconProps {
    className?: string;
    name: string;
    size?: IconSize;
    color?: IconColor;
    onClick?: () => void;
    fill?: boolean;
    outlined?: boolean;
}

export enum IconSize {
    X_SMALL = 'x-small',
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
    X_LARGE = 'x-large',
    XX_LARGE = 'xx-large',
    AUTO = 'auto',
}

export enum IconColor {
    PRIMARY = 'primary',
    INTERACTION = 'interaction',
    SECONDARY_BASE = 'secondary-base',
    SECONDARY_600 = 'secondary-600',
    SUCCESS = 'success',
    ERROR = 'error',
}
