import type { FunctionComponent } from 'react';
import { useMemo, useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import type { MetaTagsDescriptor } from '../../../shared/components/meta/meta';
import { Meta } from '../../../shared/components/meta/meta';
import { Toaster } from '../../../shared/components/toaster/toaster';
import { useDesktop } from '../../../shared/hooks/breakpoint';
import { useFullPath } from '../../../shared/hooks/use-full-location';
import { layoutStore, selectIsMainMenuOpen } from '../../../shared/store/layout.store';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { useLayoutContext } from '../../util/layout-context';

import styles from './main.module.scss';

const style = createStyleHelper(styles, 'app');

export const MainAuthenticated: FunctionComponent = () => {
    const { layout } = useLayoutContext();
    const intl = useIntl();
    const isDesktop = useDesktop();
    const isMenuOpen = useSelector(selectIsMainMenuOpen);
    const dispatch = useDispatch();
    const toggleMenu = useCallback(
        () => dispatch(layoutStore.actions.toggleMainMenu()),
        [dispatch],
    );
    const returnPath = useFullPath();

    useEffect(() => {
        if (isMenuOpen && isDesktop) {
            toggleMenu();
        }
    }, [toggleMenu, isDesktop, isMenuOpen]);

    useEffect(() => {
        toggleMenu();
    }, [returnPath, toggleMenu]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('overflow-hidden');
            return;
        }

        document.body.classList.remove('overflow-hidden');
    }, [isMenuOpen]);

    const metaTags = useMemo(
        (): MetaTagsDescriptor[] => [
            {
                tag: 'title',
                content: intl.formatMessage({
                    id: 'page.title',
                    defaultMessage: 'Front-end-client',
                }),
            },
        ],
        [intl],
    );

    return (
        <div
            className={style(undefined, {
                'highlight-content': isDesktop,
                'alternate-background': !!layout.showMobileBackground && !isDesktop,
                'fixed-height': !!layout.isFixedHeight,
            })}
        >
            <Meta tags={metaTags} />

            <div
                className={style('content', {
                    'full': !!layout.isFullWidth,

                    'fixed-height': !!layout.isFixedHeight,
                })}
            >
                <Toaster className={style('toaster')} />
                <Outlet />
            </div>
        </div>
    );
};
