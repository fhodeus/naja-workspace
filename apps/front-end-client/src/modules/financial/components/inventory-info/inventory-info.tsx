import React from 'react';

import {  Gap } from '@endeavour/ui-kit';
import type {  InventoryResponseViewModel } from '@endeavour/verification-integration';

import { LabelData } from '../../../shared/components/label-data/label-data';
import { createStyleHelper } from '../../../shared/utils/class-names';

import styles from './inventory-info.module.scss';

const style = createStyleHelper(styles, 'inventory-info');

export const InventoryInfo = ({ inventory }: { inventory: InventoryResponseViewModel }) => {
    const { quantity, doseInventory: _doseInventory, used, } = inventory;

    return (
        <div className={style()}>
            <Gap className={style('inventory-info-aside')} direction='horizontal'>
                <LabelData label={'Quantidade'} data={quantity} />
                <LabelData label={'Utilizado'} data={used} />
                <LabelData label={'Restante'} data={quantity - used} />
            </Gap>
        </div>
    );
};
