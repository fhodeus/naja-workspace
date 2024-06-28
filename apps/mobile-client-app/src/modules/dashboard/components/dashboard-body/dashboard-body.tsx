import React from 'react';

import { createClassName, createStyleHelper } from '../../../shared/utils/class-names';
import type { FCWithChildren } from '../../../shared/utils/component.interface';

import styles from './dashboard-body.module.scss';

const style = createStyleHelper(styles, 'dashboard-body');

export interface IDashboardBody {
    className?: string;
}

export const DashboardBody: FCWithChildren<IDashboardBody> = ({ className, children }) => {
    return (
        <div className={createClassName([className, style(undefined)])}>
            <div className={style('content')}>{children}</div>
        </div>
    );
};
