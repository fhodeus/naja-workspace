import type { FunctionComponent } from 'react';
// import React, { useCallback, useState } from 'react';

// import { Button } from '@endeavour/ui-kit';

import { createClassName, createStyleHelper } from '../../../shared/utils/class-names';
import { Menu } from '../menu/menu';

import styles from './dashboard-menu.module.scss';

const style = createStyleHelper(styles, 'dashboard-menu');

export interface IDashboardMenu {
    className?: string;
}

export const DashboardMenu: FunctionComponent<IDashboardMenu> = ({ className }) => {
    return (
        <div className={createClassName([className, style(undefined)])}>
            <div className={style('dashboard-menu', { 'is-open': true })}>
                <div className={style('inner')}>
                    <Menu />
                </div>
            </div>
        </div>
    );
};
