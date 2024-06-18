import type { Meta , StoryObj } from '@storybook/react';

import { Dropdown } from './dropdown';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
    title: 'Shared/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
    {
        value: 'Primeiro',
        name: 'Primeiro',
        id: 1,
    },
    {
        value: 'Segundo',
        name: 'Segundo',
        id: 2,
    },
    {
        value: 'Terceiro',
        name: 'Terceiro',
        id: 3,
    },
];

export const DEFAULT: Story = {
    args: {
        placeholder: 'Selecione Uma Opcao (Placeholder)',
        items,
    },
};

export const Dropdown_DARK: Story = {
    args: {
        placeholder: 'Dropdown DARK (Placeholder)',
        dark: true,
        items,
    },
};

export const Dropdown_LARGE: Story = {
    args: {
        placeholder: 'Dropdown LARGE (Placeholder)',
        large: true,
        items,
    },
};
