import { BadgeType } from '@endeavour/ui-kit';
import type { Financial } from '@endeavour/verification-integration';

export function getFinancialState(financial?: Financial): {
    state: 'fechado' | 'faturando' | 'em aberto' | 'faturado';
    BadgeStateType: BadgeType;
} {
    if (!financial) {
        return { state: 'em aberto', BadgeStateType: BadgeType.COMPLEMENTARY };
    }
    const currentDate = new Date();

    const startDate = new Date(financial.startTime);
    const endDate = new Date(financial.endTime);

    if (financial.status === 'faturado') {
        return { state: 'faturado', BadgeStateType: BadgeType.SUCCESS };
    }

    if (currentDate > endDate) {
        return { state: 'fechado', BadgeStateType: BadgeType.DANGER };
    }

    if (currentDate > startDate) {
        return { state: 'faturando', BadgeStateType: BadgeType.ALERT };
    }

    return { state: 'em aberto', BadgeStateType: BadgeType.COMPLEMENTARY };
}

export function useFinancialState(financial: Financial): {
    state: 'fechado' | 'faturando' | 'em aberto' | 'faturado';
    BadgeStateType: BadgeType;
} {
    const currentDate = new Date();

    const startDate = new Date(financial.startTime);
    const endDate = new Date(financial.endTime);

    if (financial.status === 'faturado') {
        return { state: 'faturado', BadgeStateType: BadgeType.SUCCESS };
    }

    if (currentDate > endDate) {
        return { state: 'fechado', BadgeStateType: BadgeType.DANGER };
    }

    if (currentDate > startDate) {
        return { state: 'faturando', BadgeStateType: BadgeType.ALERT };
    }

    return { state: 'em aberto', BadgeStateType: BadgeType.COMPLEMENTARY };
}
