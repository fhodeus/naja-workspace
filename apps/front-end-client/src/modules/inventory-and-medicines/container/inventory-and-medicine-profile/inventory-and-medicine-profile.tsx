import { Fragment, Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import {
    Badge,
    BadgeSize,
    BadgeType,
    Box,
    ContentId,
    Divider,
    Gap,
    GapSize,
    Title,
    Tooltip,
} from '@endeavour/ui-kit';

import { inventoryService } from '../../../../service/inventory.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { Loader } from '../../../shared/components/loader/loader';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { Await } from '../../../shared/utils/loader';
import { InventoryInfo } from '../../components/inventory-info/inventory-info';
import { InventoryLoteInfo } from '../../components/inventory-lote-info/inventory-lote-info';

import styles from './inventory-and-medicine-profile.module.scss';

const style = createStyleHelper(styles, 'inventory-and-medicine-profile');

export const InventoryAndMedicinesProfileContainer = () => {
    const params = useParams();

    const loader = { response: inventoryService.getInventorie(params.id ?? '') };

    useDashboardHeader('Medicamentos/Suprimento');

    return (
        <Gap>
            <Title>Medicamento/Suprimento em Estoque</Title>
            <Suspense
                fallback={useMemo(
                    () => (
                        <Loader />
                    ),
                    [],
                )}
            >
                <Await resolve={loader.response}>
                    {({ content }) => (
                        <Gap>
                            <Box>
                                <Gap>
                                    <div>
                                        <Gap direction="horizontal">
                                            <p className={style('client-name')}>{content.name}</p>
                                            <Gap direction="horizontal" size={GapSize.SMALL}>
                                                {content.used < content.quantity ? (
                                                    <Fragment>
                                                        <Tooltip
                                                            direction={'top'}
                                                            content={
                                                                'Ainda há disponibilidade no estoque'
                                                            }
                                                        >
                                                            <Badge
                                                                size={BadgeSize.CAPTION}
                                                                type={BadgeType.SUCCESS}
                                                            >
                                                                stocked
                                                            </Badge>
                                                        </Tooltip>
                                                        {content.used >= content.reorderPoint ? (
                                                            <Tooltip
                                                                direction={'top'}
                                                                content={
                                                                    'necessita reabastecimento'
                                                                }
                                                            >
                                                                <Badge
                                                                    size={BadgeSize.CAPTION}
                                                                    type={BadgeType.ALERT}
                                                                >
                                                                    reorder
                                                                </Badge>
                                                            </Tooltip>
                                                        ) : null}
                                                    </Fragment>
                                                ) : (
                                                    <Tooltip
                                                        direction={'top'}
                                                        content={'sem estoque disponivel'}
                                                    >
                                                        <Badge
                                                            size={BadgeSize.CAPTION}
                                                            type={BadgeType.DANGER}
                                                        >
                                                            out-stocked
                                                        </Badge>
                                                    </Tooltip>
                                                )}
                                            </Gap>
                                        </Gap>
                                        <Gap direction="horizontal">
                                            <ContentId>{content.id}</ContentId>
                                        </Gap>
                                    </div>
                                    <Divider />
                                    <InventoryInfo inventory={content} />
                                </Gap>
                            </Box>

                            <InventoryLoteInfo inventory={content} />
                        </Gap>
                    )}
                </Await>
            </Suspense>
        </Gap>
    );
};
