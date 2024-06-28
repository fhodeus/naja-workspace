import React from 'react';

import { DashboardBody } from '../components/dashboard-body/dashboard-body';
import { DashboardHeader } from '../components/dashboard-header/dashboard-header';
import { DashboardMenu } from '../components/dashboard-menu/dashboard-menu';
import { View } from 'react-native';

export const DashboardContainer = () => {
    return (
        <View>
            <DashboardMenu />
            <View>
                <DashboardHeader />
                <DashboardBody>
                  
                </DashboardBody>
            </View>
        </View>
    );
};
