import React, { useCallback, useEffect, useState } from 'react';

import { Divider, Gap, Title } from '@endeavour/ui-kit';
import type { FinancialResponse } from '@endeavour/verification-integration';

import { financialService } from '../../../../service/fianancial.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { Loader } from '../../../shared/components/loader/loader';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { FinancialListItem } from '../../components/financial-list-item/financial-list-item';

import styles from './financial-list.module.scss';

const style = createStyleHelper(styles, 'financial-container');

export const FinancialListContainer = () => {
    const [loading, setLoading] = useState(true);
    const [financial, setFinancial] = useState<FinancialResponse[]>([]);

    const searchFinancial = useCallback(async () => {
        setLoading(true);

        const t = await financialService.getFinancials();

        setFinancial(t.content);
        setLoading(false);
    }, []);

    useEffect(() => {
        searchFinancial();
    }, [searchFinancial]);

    useDashboardHeader('Lista do Balanço Financeiro');

    return (
        <div className={style(undefined)}>
            <Title>Balanço</Title>
            <Divider />
            {loading ? (
                <Loader />
            ) : (
                <Gap>
                    {financial.map((e) => {
                        return <FinancialListItem key={e.month} financial={e} />;
                    })}
                </Gap>
            )}
        </div>
    );
};
