import { useCallback } from 'react';

import { createStyleHelper, createClassName } from '../../utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';
import { ContextNavLink } from '../context-nav-link/context-nav-link';

import styles from './nav-dropdown-item.module.scss';

const style = createStyleHelper(styles, 'nav-dropdown-item');

export interface INavDropdownItemProps {
    href: string;
}

export const NavDropdownItem: FCWithChildren<INavDropdownItemProps> = ({ children, href }) => {
    return (
        <ContextNavLink
            className={useCallback(
                ({ isActive }: { isActive: boolean }) =>
                    createClassName([
                        style(undefined, {
                            active: isActive,
                        }),
                    ]),
                [],
            )}
            to={href}
        >
            {children}
        </ContextNavLink>
    );
};
