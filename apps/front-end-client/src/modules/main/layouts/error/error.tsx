import { useDesktop } from '../../../shared/hooks/breakpoint';
import { createStyleHelper } from '../../../shared/utils/class-names';
import type { FCWithChildren } from '../../../shared/utils/component.interface';

import styles from './error.module.scss';

const style = createStyleHelper(styles, 'error');

export const ErrorLayout: FCWithChildren<{
    title: JSX.Element | string;
}> = ({ title, children }) => {
    const isFullDisplay = useDesktop();

    return (
        <div
            className={style(undefined, {
                'highlight-content': isFullDisplay,
            })}
        >
            <h1 className={style('title')}>{title}</h1>
            <div className={style('content')}>{children}</div>
        </div>
    );
};
