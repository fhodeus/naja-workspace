import { Gap } from '@endeavour/ui-kit';

import { createStyleHelper } from '../../utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';

import styles from './nav-dropdown.module.scss';

const style = createStyleHelper(styles, 'nav-dropdown');

export interface INavDropdownProps {
    items: JSX.Element;
}

export const NavDropdown: FCWithChildren<INavDropdownProps> = ({ children, items }) => {
    return (
        <nav className={style()}>
            {children}

            <div className={style('items')}>
                <Gap direction="vertical">{items}</Gap>
            </div>
        </nav>
    );
};
