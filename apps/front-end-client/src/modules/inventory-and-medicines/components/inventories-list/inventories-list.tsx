import { useEffect, useState, useCallback } from 'react';

import { Gap } from '@endeavour/ui-kit';
import type { InventoryResponseViewModel } from '@endeavour/verification-integration';

import { inventoryService } from '../../../../service/inventory.service';
import { Loader } from '../../../shared/components/loader/loader';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { InventoryListItemComponent } from '../inventory-list-item/inventory-list-item';

import styles from './inventories-list.module.scss';

const style = createStyleHelper(styles, 'inventories-list');

export const InventoriesListComponent = () => {
    
    const [inventories, setInventories] = useState<InventoryResponseViewModel[]>([]);
    const [loading, setLoading] = useState(true);

    const fetch = useCallback(async () => {
        const { content } = await inventoryService.getInventories();
        setLoading(false);
        setInventories(content);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    if (loading) {
        return <Loader message="Carregando" />;
    }

    return (
        <Gap className={style()}>
            {inventories.map((inventory) => (
                <InventoryListItemComponent inventory={inventory} key={inventory.id} />
            ))}
        </Gap>
    );
};
