import { useCallback, useState } from 'react';

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
import type { UserResponse } from '@endeavour/verification-integration';

import { useGuardRole } from '../../../main/hooks/use-guard-role';
import { ContextLink } from '../../../shared/components/context-link/context-link';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { CustomerInfo } from '../customer-info/customer-info';

import styles from './customer-list-item.module.scss';

const style = createStyleHelper(styles, 'customer-list-item');

export const CustomerListItemComponent = ({ client }: { client: UserResponse }) => {
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
                        <div className={style('client-name')}>{client.fullName}</div>
                        <Gap align={GapAlign.CENTER} direction="horizontal">
                            <Badge size={BadgeSize.CAPTION} type={BadgeType.SUCCESS}>
                                {client.pets?.length} pets
                            </Badge>
                        </Gap>
                    </Gap>
                    <Gap direction="horizontal">
                        <ContentId>{client.email}</ContentId>
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
                        {isEditable ? (
                            <ContextLink to={`/dashboard/customer/${client.id}`}>
                                <Button
                                    size={ButtonSize.SMALL}
                                    variant={ButtonVariant.ACTION}
                                    hasIcon
                                >
                                    <MaterialSymbol name="edit" />
                                </Button>
                            </ContextLink>
                        ) : null}
                        <ContextLink to={`/dashboard/customer/profile/${client.id}`}>
                            <Button size={ButtonSize.SMALL} variant={ButtonVariant.ACTION} hasIcon>
                                <MaterialSymbol name="arrow_outward" />
                            </Button>
                        </ContextLink>
                    </Gap>
                    <Gap>
                        <Divider />
                        <CustomerInfo customer={client} />
                    </Gap>
                </Gap>
            </Accordion>
        </Box>
    );
};
