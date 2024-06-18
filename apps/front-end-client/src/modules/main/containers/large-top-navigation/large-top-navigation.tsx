import type { FunctionComponent } from 'react';

export interface ILargeTopNavigationProps {
    className?: string;
    hideNavigationActions?: boolean;
}

export const LargeTopNavigation: FunctionComponent<ILargeTopNavigationProps> = ({ className }) => {
    const _className = className;
    return <>LargeTopNavigation</>;
};
