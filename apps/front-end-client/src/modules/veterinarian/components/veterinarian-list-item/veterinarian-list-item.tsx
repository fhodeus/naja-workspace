import React, { useCallback, useState } from 'react';

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
    GapAlign,
    GapSize,
    MaterialSymbol,
} from '@endeavour/ui-kit';
import type { VeterinarianResponse } from '@endeavour/verification-integration';

import { useGuardRole } from '../../../main/hooks/use-guard-role';
import { ContextNavLink } from '../../../shared/components/context-nav-link/context-nav-link';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { VeterinarianInfoComponent } from '../veterinarian-info/veterinarian-info';

import styles from './veterinarian-list-item.module.scss';

const style = createStyleHelper(styles, 'veterinarian-list-item');

export const VeterinarianListItem = ({ veterinarian }: { veterinarian: VeterinarianResponse }) => {
    const isEditable = useGuardRole('admin');

    const [open, setOpen] = useState(false);

    const dropInfo = useCallback(() => {
        setOpen((e) => !e);
    }, []);

    return (
        <Box>
            <Gap className={style('header')} direction="horizontal">
                <div>
                    <Gap direction="horizontal">
                        <div className={style('client-name')}>{veterinarian.fullName}</div>
                        <Gap align={GapAlign.CENTER} direction="horizontal">
                            {veterinarian.consultations ? (
                                <Badge size={BadgeSize.CAPTION} type={BadgeType.SUCCESS}>
                                    {
                                        veterinarian.consultations?.filter(
                                            (c) => c.status === 'agendado',
                                        ).length
                                    }{' '}
                                    consultas
                                </Badge>
                            ) : null}
                        </Gap>
                    </Gap>
                    <ContentId>{veterinarian.email}</ContentId>
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
                        {isEditable ? (
                            <ContextNavLink to={`/dashboard/veterinarian/${veterinarian.id}`}>
                                <Button
                                    size={ButtonSize.SMALL}
                                    variant={ButtonVariant.ACTION}
                                    hasIcon
                                >
                                    <MaterialSymbol name="edit" />
                                </Button>
                            </ContextNavLink>
                        ) : null}
                        <ContextNavLink to={`/dashboard/veterinarian/profile/${veterinarian.id}`}>
                            <Button size={ButtonSize.SMALL} variant={ButtonVariant.ACTION} hasIcon>
                                <MaterialSymbol name="arrow_outward" />
                            </Button>
                        </ContextNavLink>
                    </Gap>
                    <Gap>
                        <Divider />
                        <VeterinarianInfoComponent veterinarian={veterinarian} />
                    </Gap>
                </Gap>
            </Accordion>
        </Box>
    );
};
