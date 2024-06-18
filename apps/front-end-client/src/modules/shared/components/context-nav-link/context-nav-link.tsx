import type { FunctionComponent } from 'react';
import { forwardRef } from 'react';
import { NavLink, type NavLinkProps } from 'react-router-dom';

import { addContextToUrl } from '../../hooks/use-context-navigate';
import { useHrefBuilder } from '../../hooks/use-href';
import { createClassName, createStyleHelper } from '../../utils/class-names';

import styles from './context-nav-link.module.scss';

const style = createStyleHelper(styles, 'context-nav-link');

export const ContextNavLink: FunctionComponent<
    NavLinkProps & React.RefAttributes<HTMLAnchorElement>
> = forwardRef(({ to, className, ...restProps }, ref) => {
    const hrefBuilder = useHrefBuilder();
    const link = addContextToUrl(to, hrefBuilder);

    const classNameProps = typeof className === 'string' ? className : undefined;

    return (
        <NavLink
            className={createClassName([style(), classNameProps])}
            ref={ref}
            to={link}
            {...restProps}
        />
    );
});
