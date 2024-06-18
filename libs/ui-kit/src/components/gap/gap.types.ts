export enum GapSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export enum GapAlign {
    CENTER = 'center',
    START = 'start',
    END = 'end',
}
export interface IGapProps {
    className?: string;
    size?: GapSize;
    direction?: 'horizontal' | 'vertical';
    align?: GapAlign;
}
