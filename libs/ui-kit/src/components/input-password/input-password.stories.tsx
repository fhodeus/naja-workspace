import type { Meta , StoryObj } from '@storybook/react';

import { InputPassword } from './input-password';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
    title: 'Shared/Password-Input',
    component: InputPassword,
    tags: ['autodocs'],
} satisfies Meta<typeof InputPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {
    args: {
        placeholder: 'Username',
    },
};
