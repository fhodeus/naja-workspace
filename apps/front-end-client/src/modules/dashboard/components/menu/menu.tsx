import { Fragment, useCallback, useEffect, useRef, useState, type FunctionComponent } from 'react';
import { useAuth } from 'react-oidc-context';

import {
    Box,
    Button,
    ButtonVariant,
    Divider,
    Gap,
    GapAlign,
    GapSize,
    MaterialSymbol,
} from '@endeavour/ui-kit';

import enFlag from '../../../../assets/lang-flags/en.svg';
import ptFlag from '../../../../assets/lang-flags/pt.svg';
import { useAppDispatch, useAppSelector } from '../../../main/store/root.store';
import { ContextLink } from '../../../shared/components/context-link/context-link';
import { FormattedMessage } from '../../../shared/components/formatted-message/formatted-message';
import { localeStore, selectLanguage } from '../../../shared/store/locale.store';
import { assertIsNode } from '../../../shared/utils/asserts-in-node';
import { createClassName, createStyleHelper } from '../../../shared/utils/class-names';
import { MenuNavigation } from '../menu-navigation/menu-navigation';

import styles from './menu.module.scss';

const style = createStyleHelper(styles, 'menu');

export interface IMenu {
    className?: string;
}

export const Menu: FunctionComponent<IMenu> = ({ className }) => {
    const auth = useAuth();
    const user = auth.user;
    const fullNameUser = `${user?.profile?.name} ${user?.profile?.family_name}`;
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const language = useAppSelector(selectLanguage);

    const actionRef = useRef<HTMLDivElement>(null);

    const togleActions = useCallback(() => {
        setOpen((e) => !e);
    }, []);

    const mouseHandlers = useCallback((e: MouseEvent) => {
        assertIsNode(e.target);
        setOpen(!!actionRef.current?.contains(e.target));
    }, []);

    const onChangeLocale = useCallback(() => {
        dispatch(
            localeStore.actions.changeLocale({
                fullLocale: 'en-US',
                language: 'en',
            }),
        );
    }, [dispatch]);

    const onChangeLocalePT = useCallback(() => {
        dispatch(
            localeStore.actions.changeLocale({
                fullLocale: 'pt-BR',
                language: 'pt',
            }),
        );
    }, [dispatch]);

    useEffect(() => {
        document.addEventListener('mousedown', mouseHandlers);

        return () => {
            document.removeEventListener('mousedown', mouseHandlers);
        };
    }, [mouseHandlers]);

    if (auth.isLoading || !auth.isAuthenticated) {
        return <Fragment />;
    }

    return (
        <div className={createClassName([className, style(undefined)])}>
            <div>
                <div className={style('header')}>
                    <Gap direction="horizontal" align={GapAlign.CENTER}>
                        <MaterialSymbol name="pets" />
                        Clinic Pet Ong
                    </Gap>
                </div>
                <Divider />
            </div>
            <MenuNavigation auth={auth} />
            <div>
                <Divider />
                <div className={style('footer')}>
                    <Gap direction="horizontal" className={style('footer-content')}>
                        <div className={style('user-agent')}>
                            <div className={style('name-icon')}>
                                <p>{`${user?.profile?.name?.[0]}${user?.profile?.family_name?.[0]}`}</p>
                            </div>
                            <div className={style('user-info')}>
                                <p className={style('name')} title={fullNameUser}>
                                    {fullNameUser}
                                </p>
                                <p className={style('email')} title={user?.profile?.email}>
                                    {user?.profile?.email}
                                </p>
                            </div>
                        </div>

                        <div className={style('actions')}>
                            <Button
                                className={style('to-logout')}
                                hasIcon
                                variant={ButtonVariant.LIGHT}
                                onClick={togleActions}
                            >
                                <MaterialSymbol name="more_vert" />
                            </Button>
                            {open ? (
                                <div ref={actionRef}>
                                    <Box className={style('action-content')}>
                                        <Gap size={GapSize.SMALL}>
                                            <div>
                                                <p className={style('action-title')}>
                                                    <FormattedMessage id="dashboard.components.menu.appearance" />
                                                </p>
                                                <Button className={style('to-logout')}>
                                                    <Gap direction="horizontal">
                                                        <MaterialSymbol name="straighten" />
                                                        <FormattedMessage id="dashboard.components.menu.straighten" />
                                                    </Gap>
                                                </Button>
                                                <Button className={style('to-logout')}>
                                                    <Gap direction="horizontal">
                                                        <MaterialSymbol name="aspect_ratio" />
                                                        <FormattedMessage id="dashboard.components.menu.full-screen" />
                                                    </Gap>
                                                </Button>
                                            </div>
                                            <Divider />
                                            {language === 'en' ? (
                                                <Button
                                                    className={style('to-logout')}
                                                    onClick={onChangeLocalePT}
                                                >
                                                    <Gap direction="horizontal">
                                                        <img
                                                            className={style('language-flag')}
                                                            src={enFlag}
                                                        />
                                                        <FormattedMessage id="dashboard.components.menu.language" />{' '}
                                                        ({language})
                                                    </Gap>
                                                </Button>
                                            ) : (
                                                <Button
                                                    className={style('to-logout')}
                                                    onClick={onChangeLocale}
                                                >
                                                    <Gap direction="horizontal">
                                                        <img
                                                            className={style('language-flag')}
                                                            src={ptFlag}
                                                        />
                                                        <FormattedMessage id="dashboard.components.menu.language" />{' '}
                                                        ({language})
                                                    </Gap>
                                                </Button>
                                            )}
                                            <Divider />
                                            <Button className={style('to-logout')}>
                                                <Gap direction="horizontal">
                                                    <MaterialSymbol name="javascript" />
                                                    <FormattedMessage id="dashboard.components.menu.javascript-structure" />
                                                </Gap>
                                            </Button>
                                            <Divider />
                                            <ContextLink to={'/logout'}>
                                                <Button className={style('to-logout')}>
                                                    <Gap direction="horizontal">
                                                        <MaterialSymbol name="logout" />
                                                        <FormattedMessage id="dashboard.components.menu.log-out" />{' '}
                                                    </Gap>
                                                </Button>
                                            </ContextLink>
                                        </Gap>
                                    </Box>
                                </div>
                            ) : null}
                        </div>
                    </Gap>
                </div>
            </div>
        </div>
    );
};
