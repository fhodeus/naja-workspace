import type { ComponentProps } from 'react';

import { ProgressBar } from './progress-bar';

export default {
    title: 'Shared/ProgressBar',
    component: ProgressBar,
};

export const Default = {
    render: (args: Partial<ComponentProps<typeof ProgressBar>>) => (
        <ProgressBar percentageValue={65} light={true} value={'65%'} {...args} />
    ),
    name: 'default',
};
