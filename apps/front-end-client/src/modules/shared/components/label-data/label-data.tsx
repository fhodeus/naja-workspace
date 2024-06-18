import React from 'react';

import type { FCWithChildren } from '@endeavour/ui-kit/dist/utils/component.interface';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './label-data.module.scss';

export interface ILabelData {
    className?: string;

    label?: string | JSX.Element;
    data?: string | number | JSX.Element;
}

const style = createStyleHelper(styles, 'label-data');

export const LabelData: FCWithChildren<ILabelData> = ({ className, label, data, children }) => {
    return (
        <div className={createClassName([className, style(undefined)])}>
            <div className={style('label')}>{label}</div>
            <div className={style('data')}>{children ?? data}</div>
        </div>
    );
};
