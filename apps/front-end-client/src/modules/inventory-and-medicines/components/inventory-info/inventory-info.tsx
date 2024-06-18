import React from 'react';

import { ContentId, Divider, Gap } from '@endeavour/ui-kit';
import type {  InventoryResponseViewModel } from '@endeavour/verification-integration';

import { LabelData } from '../../../shared/components/label-data/label-data';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { KeysOfObject } from '../../../shared/utils/object-key';

import styles from './inventory-info.module.scss';

const style = createStyleHelper(styles, 'inventory-info');

export const InventoryInfo = ({ inventory }: { inventory: InventoryResponseViewModel }) => {
    const { quantity, doseInventory: _doseInventory, id, used, ...restInventory } = inventory;

    return (
        <div className={style()}>
            <Gap className={style('inventory-info-aside')}>
                <LabelData label={'Quantidade'} data={quantity} />
                <LabelData label={'Utilizado'} data={used} />
                <LabelData label={'Restante'} data={quantity - used} />
            </Gap>
            <Divider vertical />
            <div className={style('inventory-info-content')}>
                <LabelData label={'id'}>
                    <ContentId>{id}</ContentId>
                </LabelData>
                {KeysOfObject(restInventory).map((key) => (
                    <LabelData
                        key={key}
                        label={key}
                        data={JSON.stringify(inventory[key], null, '\t').replace(/"/g, '')}
                    />
                ))}
            </div>
        </div>
    );
};
