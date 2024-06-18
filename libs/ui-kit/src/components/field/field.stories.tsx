import React from 'react';

import type { Meta , StoryObj } from '@storybook/react';


import { Input } from '../components';

import { Field } from './field';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
    title: 'Shared/Field',
    component: Field,
    tags: ['autodocs'],
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {
    args: {
        label: 'Label',
        children: <Input placeholder="Username" />,
    },
};

export const Field_ERROR: Story = {
    args: {
        label: 'Label',
        children: <Input placeholder="Username" />,
        hasError: true,
        message: 'Please enter your full name',
    },
};

export const Field_INFO: Story = {
    args: {
        label: 'Label',
        children: <Input placeholder="Username" />,
        info: 'Well send you an email to this',
        infoOpen: true,
    },
};

export const Field_success: Story = {
    args: {
        label: 'Label',
        children: <Input placeholder="Username" />,
        hasSuccess: true,
    },
};
