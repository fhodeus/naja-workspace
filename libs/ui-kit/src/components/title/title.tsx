import React from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';

import styles from './title.module.scss';
import type { ITitleProps } from './title.types';

const style = createStyleHelper(styles, 'title');

export const Title: FCWithChildren<ITitleProps> = ({ children, className }) => {
    return <h2 className={createClassName([className, style()])}>{children}</h2>;
};
