import React from 'react';

import {
    Button,
    ButtonSize,
    ButtonVariant,
    Divider,
    Gap,
    MaterialSymbol,
    Title,
} from '@endeavour/ui-kit';

import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { useGuardRole } from '../../../main/hooks/use-guard-role';
import { ContextNavLink } from '../../../shared/components/context-nav-link/context-nav-link';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { InventoriesListComponent } from '../../components/inventories-list/inventories-list';

import styles from './inventory-and-medicines.module.scss';

const style = createStyleHelper(styles, 'inventory-container-list');

export const InventoryAndMedicinesListContainer = () => {
    const isEditable = useGuardRole('admin');

    useDashboardHeader('Medicamentos/Suprimento em Estoque');

    return (
        <div className={style(undefined)}>
            <Gap direction="horizontal" className={style('page-title-container')}>
                <Title>Medicamentos/Suprimentos em Estoque</Title>
                {isEditable ? (
                    <ContextNavLink to={'/dashboard/invertory-and-medicine/create'}>
                        <Button size={ButtonSize.SMALL} variant={ButtonVariant.ACTION} hasIcon>
                            <MaterialSymbol name="add" />
                        </Button>
                    </ContextNavLink>
                ) : null}
            </Gap>
            <Divider />
            <InventoriesListComponent />
        </div>
    );
};
