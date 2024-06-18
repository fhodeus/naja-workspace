import type { FunctionComponent } from 'react';
import React from 'react';

import { Gap, GapAlign, MaterialSymbol } from '@endeavour/ui-kit';

import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { createClassName, createStyleHelper } from '../../../shared/utils/class-names';

import styles from './dashboard-header.module.scss';

const style = createStyleHelper(styles, 'dashboard-header');

export interface IDashboardHeader {
    className?: string;
}

export const DashboardHeader: FunctionComponent<IDashboardHeader> = ({ className }) => {
    const [dashboardHeader] = useDashboardHeader();

    return (
        <div className={createClassName([className, style(undefined)])}>
            <Gap direction="horizontal" align={GapAlign.CENTER}>
                <MaterialSymbol name="pets" />
                {dashboardHeader}
            </Gap>
        </div>
    );
};
