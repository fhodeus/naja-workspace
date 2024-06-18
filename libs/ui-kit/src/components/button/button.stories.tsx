import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';
import { ButtonSize, ButtonVariant } from './button.types';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
    title: 'Shared/Button',
    component: Button,
    tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Button_SMALL: Story = {
    args: {
        size: ButtonSize.SMALL,
        children: <>Button_SMALL</>,
    },
};

export const DEFAULT: Story = {
    args: {
        children: <>DEFAULT</>,
    },
};

export const Button_LARGE: Story = {
    args: {
        size: ButtonSize.LARGE,
        children: <>Button_LARGE</>,
        variant: ButtonVariant.ACTION,
    },
};

export const Button_LOADING: Story = {
    args: {
        loading: true,
        size: ButtonSize.LARGE,
        children: <>Button_LARGE</>,
        variant: ButtonVariant.ACTION,
    },
};

export const Button_HOLLOW: Story = {
    args: {
        hollow: true,
        children: <>Button_HOLLOW</>,
    },
};
