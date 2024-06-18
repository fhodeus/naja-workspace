import type { FunctionComponent } from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './menu-dropdown.module.scss';
import { SelectBox } from './select-box/select-box';
import type { ISelectBoxItem } from './select-box/select-box';

const style = createStyleHelper(styles, 'menu-dropdown');

export interface IMenuDropdownProps {
    className?: string;
    selectedItemId?: string;
    items: Array<ISelectBoxItem>;
    onSelect?: (item: ISelectBoxItem) => void;
}

export const MenuDropdown: FunctionComponent<IMenuDropdownProps> = ({
    className,
    selectedItemId,
    items,
    onSelect,
}) => {
    if (!items) {
        return null;
    }

    return (
        <div className={createClassName([className, style()])}>
            <SelectBox selectedItemId={selectedItemId} items={items} onSelect={onSelect} />
        </div>
    );
};
