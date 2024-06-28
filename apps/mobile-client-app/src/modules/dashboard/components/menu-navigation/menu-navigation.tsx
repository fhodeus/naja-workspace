import type { FunctionComponent } from 'react';
import type { AuthContextProps } from 'react-oidc-context';

import { Gap, GapSize } from '@endeavour/ui-kit';

import { MenuNavigationButton } from '../../../shared/components/menu-navigation/menu-navigation';
import { createClassName, createStyleHelper } from '../../../shared/utils/class-names';

import styles from './menu-navigation.module.scss';

const style = createStyleHelper(styles, 'menu-navigation');

export interface MenuNavigation {
    className?: string;
    auth: AuthContextProps;
}

export const MenuNavigation: FunctionComponent<MenuNavigation> = ({ className, auth }) => {
    const groups = (auth.user?.profile.groups as string[]) ?? [];

    if (groups.length === 0) {
        return (
            <Gap size={GapSize.MEDIUM} className={createClassName([className, style(undefined)])} />
        );
    }

    if (groups.find((e) => e === 'admin')) {
        return (
            <Gap size={GapSize.MEDIUM} className={createClassName([className, style(undefined)])}>
                <MenuNavigationButton to={'dashboard/consultations'}>
                    Consultas Agendadas
                </MenuNavigationButton>
                <MenuNavigationButton to={'dashboard/invertory-and-medicine'}>
                    Estoque e Medicamentos
                </MenuNavigationButton>
                <MenuNavigationButton to={'dashboard/veterinarian'}>
                    Veterinários
                </MenuNavigationButton>
                <MenuNavigationButton to={'dashboard/financial'}>Financeiro</MenuNavigationButton>
                <MenuNavigationButton to={'dashboard/customer'}>Clientes</MenuNavigationButton>
            </Gap>
        );
    }

    if (groups.find((e) => e === 'veterinarian')) {
        return (
            <Gap size={GapSize.MEDIUM} className={createClassName([className, style(undefined)])}>
                <MenuNavigationButton to={'dashboard/consultations'}>
                    Consultas Agendadas
                </MenuNavigationButton>
                <MenuNavigationButton to={'dashboard/invertory-and-medicine'}>
                    Estoque e Medicamentos
                </MenuNavigationButton>
                <MenuNavigationButton to={'dashboard/customer'}>Clientes</MenuNavigationButton>
            </Gap>
        );
    }

    return <Gap size={GapSize.MEDIUM} className={createClassName([className, style(undefined)])} />;
};
