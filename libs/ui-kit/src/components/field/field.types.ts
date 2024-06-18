export interface IFieldProps {
    className?: string;
    label?: string | JSX.Element;
    htmlFor?: string;

    hasError?: boolean;
    hasSuccess?: boolean;

    message?: string;

    info?: string | JSX.Element;
    infoOpen?: boolean;

    dark?: boolean;
    light?: boolean;
    variant?: string;
}