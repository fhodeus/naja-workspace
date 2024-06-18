import React from 'react';
import { Outlet } from 'react-router-dom';

import { createStyleHelper } from '../../shared/utils/class-names';
import { DashboardBody } from '../components/dashboard-body/dashboard-body';
import { DashboardHeader } from '../components/dashboard-header/dashboard-header';
import { DashboardMenu } from '../components/dashboard-menu/dashboard-menu';

import styles from './dashboard.module.scss';

const style = createStyleHelper(styles, 'dashboard');

export const DashboardContainer = () => {
    return (
        <div className={style(undefined, { body: true })}>
            <DashboardMenu />
            <div className={style(undefined, { content: true })}>
                <DashboardHeader />
                <DashboardBody>
                    <Outlet />
                </DashboardBody>
            </div>
        </div>
    );
};
