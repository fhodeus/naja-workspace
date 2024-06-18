import { useCallback, useMemo, useState } from 'react';
import type { FunctionComponent } from 'react';



import { createClassName, createStyleHelper } from '../../../utils/class-names';

import styles from './select-box.module.scss';

const style = createStyleHelper(styles, 'select-box');

export interface ISelectBoxItem {
    value: string | number | readonly string[] | undefined;
    name: string;
    id?: string | number;
    href?: string;
}

export interface ISelectBoxProps {
    className?: string;
    selectedItemId?: string;
    items: Array<ISelectBoxItem>;
    onSelect?: (item: ISelectBoxItem) => void;
}

export const SelectBox: FunctionComponent<ISelectBoxProps> = ({
    className,
    selectedItemId,
    items,
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);
    const selectedItem = useMemo(() => {
        return items.find(({ id }) => id === selectedItemId);
    }, [selectedItemId, items]);

    return (
        <div className={createClassName([className, style()])}>
            <div className={style('container')} onClick={toggle}>
                <div className={style('item', { selected: true })}>{selectedItem?.name}</div>

                {isOpen ? (
                   <>{'faAngleUp'}</> 
                ) : (
                    <>{'faAngleDown'}</>
                )}
            </div>
            <ul className={style('items', { open: isOpen })}>
                {items
                    .filter((item) => item.id !== selectedItem?.id)
                    .map((item) => (
                        <li
                            key={item.id}
                            onClick={(event) => {
                                onSelect?.(item);
                                setIsOpen(false);
                                event.preventDefault();
                            }}
                            className={style('item')}
                        >
                            {item.name}
                        </li>
                    ))}
            </ul>
        </div>
    );
};
