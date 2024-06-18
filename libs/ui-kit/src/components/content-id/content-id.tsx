import React from 'react';

import { createClassName, createStyleHelper } from '../../utils/class-names';
import type { FCWithChildren } from '../../utils/component.interface';
import { MaterialSymbol } from '../components';

import styles from './content-id.module.scss';
import type { IContentIdProps } from './content-id.types';

const style = createStyleHelper(styles, 'content-id');

export const ContentId:FCWithChildren<IContentIdProps> = ({ children, className }) => {
    return (
        <div className={createClassName([className, style(undefined)])} >
            {children}
            <button type="button" className={style('button-copy')}>
                {' '}
                <MaterialSymbol className={style('icon-copy')} name="content_copy" />
            </button>
        </div>
    );
};
