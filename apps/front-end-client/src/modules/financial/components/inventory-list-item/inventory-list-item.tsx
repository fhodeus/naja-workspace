import { Fragment, useCallback, useState } from 'react';

import {
    Accordion,
    Badge,
    BadgeSize,
    BadgeType,
    Box,
    Button,
    ButtonSize,
    ButtonVariant,
    ContentId,
    Divider,
    Gap,
    GapSize,
    MaterialSymbol,
    Tooltip,
} from '@endeavour/ui-kit';
import type { InventoryResponseViewModel } from '@endeavour/verification-integration';

import { inventoryService } from '../../../../service/inventory.service';
import { ContextNavLink } from '../../../shared/components/context-nav-link/context-nav-link';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { InventoryInfo } from '../inventory-info/inventory-info';

import styles from './inventory-list-item.module.scss';

const style = createStyleHelper(styles, 'inventory-list-item');

export const InventoryListItemComponent = ({
    inventory,
}: {
    inventory: InventoryResponseViewModel;
}) => {
    const [open, setOpen] = useState(false);

    const notification = useCallback(() => {
        inventoryService.notification({ query: inventory.id });
    }, [inventory.id]);

    const dropInfo = useCallback(() => {
        setOpen((e) => !e);
    }, []);

    return (
        <Box>
            <Gap className={style('header')} direction="horizontal">
                <div>
                    <Gap direction="horizontal">
                        <p className={style('client-name')}>{inventory.name}</p>
                        <Gap direction="horizontal" size={GapSize.SMALL}>
                            {inventory.used < inventory.quantity ? (
                                <Fragment>
                                    <Tooltip
                                        direction={'top'}
                                        content={'Ainda há disponibilidade no estoque'}
                                    >
                                        <Badge size={BadgeSize.CAPTION} type={BadgeType.SUCCESS}>
                                            stocked
                                        </Badge>
                                    </Tooltip>
                                    {inventory.used >= inventory.reorderPoint ? (
                                        <Tooltip
                                            direction={'top'}
                                            content={'necessita reabastecimento'}
                                        >
                                            <Badge size={BadgeSize.CAPTION} type={BadgeType.ALERT}>
                                                reorder
                                            </Badge>
                                        </Tooltip>
                                    ) : null}
                                </Fragment>
                            ) : (
                                <Tooltip direction={'top'} content={'sem estoque disponivel'}>
                                    <Badge size={BadgeSize.CAPTION} type={BadgeType.DANGER}>
                                        out-stocked
                                    </Badge>
                                </Tooltip>
                            )}
                        </Gap>
                    </Gap>
                    <Gap direction="horizontal">
                        <ContentId>{inventory.id}</ContentId>
                    </Gap>
                </div>
                <div>
                    <Button
                        size={ButtonSize.SMALL}
                        variant={ButtonVariant.LIGHT}
                        onClick={dropInfo}
                        hasIcon
                    >
                        {!open ? (
                            <MaterialSymbol name="expand_more" />
                        ) : (
                            <MaterialSymbol name="expand_less" />
                        )}
                    </Button>
                </div>
            </Gap>
            <Accordion isOpen={open}>
                <Gap size={GapSize.MEDIUM} className={style('expensive-box')}>
                    <Divider />
                    <Gap
                        direction="horizontal"
                        size={GapSize.MEDIUM}
                        className={style('action-area')}
                    >
                        <Gap size={GapSize.MEDIUM} direction="horizontal">
                            <Tooltip
                                direction={'bottom'}
                                content={
                                    'Esta ação estará disponivel quando o ponto de reordem for atingido.'
                                }
                            >
                                <Button
                                    variant={ButtonVariant.ACTION}
                                    disabled={
                                        inventory.used < inventory.reorderPoint ||
                                        inventory.used == inventory.quantity
                                    }
                                    onClick={notification}
                                >
                                    <Gap direction="horizontal" size={GapSize.SMALL}>
                                        <MaterialSymbol name="email" />
                                        Notificar Baixo Estoque
                                    </Gap>
                                </Button>{' '}
                            </Tooltip>
                            <Tooltip
                                direction={'bottom'}
                                content={
                                    'Esta ação estará disponivel quando não houver itens no estoque.'
                                }
                            >
                                <Button
                                    className={style('action-button-alert')}
                                    variant={ButtonVariant.ACTION}
                                    disabled={inventory.used < inventory.quantity}
                                    onClick={notification}
                                >
                                    <Gap direction="horizontal" size={GapSize.SMALL}>
                                        <MaterialSymbol name="email" />
                                        Notificar Falta de Estoque
                                    </Gap>
                                </Button>{' '}
                            </Tooltip>
                        </Gap>
                        <Gap direction="horizontal" size={GapSize.MEDIUM}>
                            <ContextNavLink
                                to={`/dashboard/invertory-and-medicine/profile/${inventory.id}`}
                            >
                                <Button
                                    size={ButtonSize.SMALL}
                                    variant={ButtonVariant.ACTION}
                                    hasIcon
                                >
                                    <MaterialSymbol name="arrow_outward" />
                                </Button>
                            </ContextNavLink>
                        </Gap>
                    </Gap>
                    <Gap>
                        <Divider />
                        <InventoryInfo inventory={inventory} />
                    </Gap>
                </Gap>
            </Accordion>
        </Box>
    );
};
