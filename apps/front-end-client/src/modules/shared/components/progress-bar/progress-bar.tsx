import type { FunctionComponent } from 'react';

import { createClassName, createStyleHelper } from '../../../shared/utils/class-names';

import styles from './progress-bar.module.scss';

const style = createStyleHelper(styles, 'progress-bar');

export interface IProgressBarProps {
    className?: string;
    percentageValue: number;
    light?: boolean;
    value?: string;
}

export const ProgressBar: FunctionComponent<IProgressBarProps> = ({
    className,
    percentageValue,
    light = false,
    value,
}) => {
    return (
        <div className={createClassName([className, style()])}>
            <div
                className={style('wagering-bar', {
                    light: light,
                    value: value ? true : false,
                })}
            >
                <div
                    className={style('wagering-bar-progress')}
                    style={{ width: `${percentageValue}%` }}
                />
            </div>
            <span className={style('value')}>{value}</span>
        </div>
    );
};
