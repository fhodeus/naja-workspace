import type { ComponentProps } from 'react';

import { TextArea } from './text-area';

export default {
    title: 'Shared/TextArea',
    component: TextArea,
};

export const Default = {
    render: (args: ComponentProps<typeof TextArea>) => (
        <TextArea placeholder="Enter some text" {...args} />
    ),
    name: 'default',
};
