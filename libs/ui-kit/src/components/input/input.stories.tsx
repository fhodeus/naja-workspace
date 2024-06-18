import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
    title: 'Shared/Input',
    component: Input,
    tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {
    args: {
        placeholder: 'Username',
    },
};

export const INPUT_DISABLED: Story = {
    args: {
        disabled: true,
        placeholder: 'Username',
    },
};
