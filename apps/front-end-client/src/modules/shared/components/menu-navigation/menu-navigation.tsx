import React from 'react';
import { useMatch } from 'react-router-dom';

import { createClassName, createStyleHelper } from '../../utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';
import { ContextNavLink } from '../context-nav-link/context-nav-link';

import styles from './menu-navigation.module.scss';

const style = createStyleHelper(styles, 'menu-navigation');

export interface IMenuNavigationProps {
    className?: string;
    to: string;
}

export const MenuNavigationButton: FCWithChildren<IMenuNavigationProps> = ({
    className,
    to,
    children,
}) => {
    const active = useMatch(to);
    
    return (
        <div>
            <ContextNavLink
                to={to}
                className={createClassName([className, style(undefined, { active: !!active })])}
            >
                {children}
            </ContextNavLink>
        </div>
    );
};
