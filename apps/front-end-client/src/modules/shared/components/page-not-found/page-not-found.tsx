import type { FunctionComponent } from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './page-not-found.module.scss';

const style = createStyleHelper(styles, 'page-not-found');

export interface IPageNotFoundProps {
    className?: string;
    message?: string;
}

export const PageNotFound: FunctionComponent<IPageNotFoundProps> = ({ className, message }) => {
    return (
        <div className={createClassName([className, style()])}>
            <p className={style('title')}>PAGE NOT FOUND!!!</p>
            <p className={style('message')}>{message}</p>
        </div>
    );
};
