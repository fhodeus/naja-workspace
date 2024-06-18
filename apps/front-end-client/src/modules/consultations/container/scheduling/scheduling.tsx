import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { consultationService } from '../../../../service/consultation.service';
import { inventoryService } from '../../../../service/inventory.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { Loader } from '../../../shared/components/loader/loader';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { Await } from '../../../shared/utils/loader';
import { SchedulingPageComponent } from '../../components/scheduling-page/scheduling-page';

import styles from './scheduling.module.scss';

const style = createStyleHelper(styles, 'scheduling-container');

export const SchedulingContainer = () => {
    const params = useParams();
    const loader = {
        consultation: consultationService.getConsultation(params.id ?? ''),
        inventory: inventoryService.getInventoriesInStock(),
    };

    useDashboardHeader('Consulta');

    const fallback = useMemo(() => <Loader message="carregando" />, []);

    return (
        <div className={style()}>
            <Suspense fallback={fallback}>
                <Await resolve={Promise.all([loader.consultation, loader.inventory])}>
                    {([{ content: consultation }, { content: inventory }]) => (
                        <SchedulingPageComponent
                            consultation={consultation}
                            inventory={inventory}
                        />
                    )}
                </Await>
            </Suspense>
        </div>
    );
};
