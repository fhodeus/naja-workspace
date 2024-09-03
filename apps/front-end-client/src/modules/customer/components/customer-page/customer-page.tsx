import React, { useCallback, useMemo } from 'react';

import {
    Box,
    Button,
    ButtonVariant,
    Divider,
    Gap,
    ButtonSize,
    MaterialSymbol,
    Title,
    ContentId,
    GapSize,
} from '@endeavour/ui-kit';
import type { UserResponse } from '@endeavour/verification-integration';

import { customerService } from '../../../../service/customer.service';
import { RolesGuard } from '../../../main/guards/roles-guard';
// import { WebCamComponent } from '../../../shared/components/web-cam/web-cam';
import { ContextNavLink } from '../../../shared/components/context-nav-link/context-nav-link';
import { JavascriptStructure } from '../../../shared/components/javascript-structure/javascript-structure';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { CustomerInfo } from '../../components/customer-info/customer-info';
import { PetSectionComponent } from '../pet-section/pet-section';

import styles from './customer-page.module.scss';

const style = createStyleHelper(styles, 'customer-page');

export const CustomerPageComponent = ({ customer }: { customer: UserResponse }) => {
    const exportData = useCallback(() => {
        customerService.exportCustomer({ query: customer.id });
    }, [customer.id]);

    return (
        <Gap className={style(undefined)}>
            <Title>Cliente</Title>
            <Divider />
            <Box>
                <Gap>
                    <div className={style('client-header')}>
                        <Gap direction="horizontal">
                            {/* <div>
                                <WebCamComponent />
                            </div> */}
                            <div>
                                <div className={style('client-name')}>{customer.fullName}</div>
                                <ContentId>{customer.id}</ContentId>
                            </div>
                        </Gap>
                        <div>
                            <Gap direction="horizontal" size={GapSize.MEDIUM}>
                                <RolesGuard roles={useMemo(() => ['admin'], [])}>
                                    <ContextNavLink to={'/dashboard/customer/' + customer.id}>
                                        <Button
                                            variant={ButtonVariant.ACTION}
                                            size={ButtonSize.SMALL}
                                            hasIcon
                                        >
                                            <MaterialSymbol name="edit" />
                                        </Button>
                                    </ContextNavLink>
                                </RolesGuard>
                                <RolesGuard roles={useMemo(() => ['admin'], [])}>
                                    <Button
                                        variant={ButtonVariant.ACTION}
                                        size={ButtonSize.SMALL}
                                        onClick={exportData}
                                        hasIcon
                                    >
                                        <MaterialSymbol name="export_notes" />
                                    </Button>
                                </RolesGuard>
                            </Gap>
                        </div>
                    </div>
                    <Divider />
                    <CustomerInfo customer={customer} />
                    <Divider />
                    <div className={style('client-info-footer')}>
                        <JavascriptStructure data={customer} />
                    </div>
                </Gap>
            </Box>
            <Box>
                <Gap>
                    <PetSectionComponent customer={customer} />
                    <Divider />
                    <div className={style('client-info-footer')}>
                        <JavascriptStructure data={customer.pets} />
                    </div>
                </Gap>
            </Box>
        </Gap>
    );
};
