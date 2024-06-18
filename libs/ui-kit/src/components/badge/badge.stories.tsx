import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './badge';
import { BadgeType } from './badge.types';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
    title: 'Shared/Badge',
    component: Badge,
    tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const INFO: Story = {
    args: {
        type: BadgeType.INFO,
        children: <>INFO</>,
    },
};

export const ALERT: Story = {
    args: {
        type: BadgeType.ALERT,
        children: <>ALERT</>,
    },
};

export const DANGER: Story = {
    args: {
        type: BadgeType.DANGER,
        children: <>DANGER</>,
    },
};

export const SUCCESS: Story = {
    args: {
        type: BadgeType.SUCCESS,
        children: <>SUCCESS</>,
    },
};

export const DARK: Story = {
    args: {
        type: BadgeType.DARK,
        children: <>DARK</>,
    },
};

export const COMPLEMENTARY: Story = {
    args: {
        type: BadgeType.COMPLEMENTARY,
        children: <>COMPLEMENTARY</>,
    },
};


