import type { FunctionComponent } from 'react';
import { forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

import { addContextToUrl } from '../../hooks/use-context-navigate';
import { useHrefBuilder } from '../../hooks/use-href';
import { createStyleHelper } from '../../utils/class-names';
import { pathToUrl } from '../../utils/path';


import styles from './context-link.module.scss';

const style = createStyleHelper(styles, 'context-link');

export const ContextLink: FunctionComponent<
    LinkProps & { rawHref?: boolean } & React.RefAttributes<HTMLAnchorElement>
> = forwardRef(({ to, rawHref = false, ...restProps }, ref) => {
    const hrefBuilder = useHrefBuilder();
    const link = addContextToUrl(to, hrefBuilder);

    if (!rawHref) {
        return <Link ref={ref} to={link} {...restProps} className={style()} />;
    }

    const url = rawHref ? pathToUrl(to) : `${window.location.origin}${pathToUrl(link)}`;

    return <a {...restProps} href={url} />;
});
