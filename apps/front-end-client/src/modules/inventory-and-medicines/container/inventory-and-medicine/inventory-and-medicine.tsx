import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { inventoryService } from '../../../../service/inventory.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { Loader } from '../../../shared/components/loader/loader';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { Await } from '../../../shared/utils/loader';
import { FormPage } from '../../components/form-page/form-page';

import styles from './inventory-and-medicine.module.scss';

const style = createStyleHelper(styles, 'inventory-container');

export const InventoryAndMedicinesContainer = () => {
    const params = useParams();

    const loader = { response: inventoryService.getInventorie(params.id ?? '') };

    useDashboardHeader('Medicamentos/Suprimento ');

    return (
        <div className={style(undefined)}>
            <Suspense
                fallback={useMemo(
                    () => (
                        <Loader />
                    ),
                    [],
                )}
            >
                <Await resolve={loader.response}>
                    {({ content }) => <FormPage content={content} />}
                </Await>
            </Suspense>
        </div>
    );
};
