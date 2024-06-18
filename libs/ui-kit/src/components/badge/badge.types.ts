export enum BadgeType {
    INFO = 'info',
    ALERT = 'alert',
    DANGER = 'danger',
    SUCCESS = 'success',
    DARK = 'dark',
    COMPLEMENTARY = 'complementary',
}

export enum BadgeSize {
    HEADING_5 = 'heading-5',
    SUBTITLE = 'subtitle',
    BODY = 'body',
    CAPTION = 'caption',
}

export interface IBadgeProps {
    className?: string;
    type?: BadgeType;
    icon?: JSX.Element;
    size?: BadgeSize;
    pill?: boolean;
}
