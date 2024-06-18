import type { ComponentProps } from 'react';

import { Radio } from './radio';

export default {
    title: 'Shared/Radio',

    parameters: {
        theme: 'light',
    },

    component: Radio,
};

export const Default = {
    render: (args: Partial<ComponentProps<typeof Radio>>) => (
        <Radio label="Is this radio selected?" {...args} />
    ),
    name: 'default',
};

export const Selected = {
    render: () => <Radio label="Is this radio selected?" defaultValue={true} />,
};
