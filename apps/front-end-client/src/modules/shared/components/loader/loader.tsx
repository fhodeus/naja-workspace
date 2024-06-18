import type { FunctionComponent } from 'react';

import { Gap, IconColor, MaterialSymbol } from '@endeavour/ui-kit';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './loader.module.scss';

const style = createStyleHelper(styles, 'loader');

export interface ILoaderProps {
    className?: string;
    message?: string;
    iconName?: string;
}

export const Loader: FunctionComponent<ILoaderProps> = ({
    className,
    message = 'carregando',
    iconName = 'pending',
}) => {
    return (
        <div className={createClassName([className, style('loading-container')])}>
            <Gap className={style('loading-wrapper')} direction="horizontal">
                <div className={style('loading-pulse')}>
                    <MaterialSymbol
                        className={style('loading-icon')}
                        color={IconColor.SECONDARY_BASE}
                        name={iconName}
                    />
                </div>
            </Gap>
            <p className={style('loading-text')}>{message}</p>
        </div>
    );
};
