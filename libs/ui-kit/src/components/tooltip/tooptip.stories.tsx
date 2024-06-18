import React from 'react';

import type { Meta, Story } from '@storybook/react';

import type { FCWithChildren } from '../../utils/component.interface';
import { Input } from '../input/input';

import type { TooltipProps } from './tooltip';
import { Tooltip } from './tooltip';

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
} as Meta;

const Template: Story<FCWithChildren<TooltipProps>> = (args) => <Tooltip {...args} />;

export const Top = Template.bind({});
Top.args = {
    direction: 'top',
    content: 'Hello, I am a tooltip at the top!',
    children: <Input />,
};

export const Bottom = Template.bind({});
Bottom.args = {
    direction: 'bottom',
    content: 'Hello, I am a tooltip at the bottom!',
    children: <Input />,
};

export const Left = Template.bind({});
Left.args = {
    direction: 'left',
    content: 'Hello, I am a tooltip on the left!',
    children: <Input />,
};

export const Right = Template.bind({});
Right.args = {
    direction: 'right',
    content: 'Hello, I am a tooltip on the right!',
    children: <Input />,
};
