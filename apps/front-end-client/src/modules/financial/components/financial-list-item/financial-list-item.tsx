import {
    Box,
    Button,
    Gap,
    MaterialSymbol,
    ButtonVariant,
    Badge,
    BadgeSize,
    BadgeType,
    GapSize,
} from '@endeavour/ui-kit';
import type { FinancialResponse } from '@endeavour/verification-integration';

import { ContextNavLink } from '../../../shared/components/context-nav-link/context-nav-link';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { useFinancialState } from '../../hooks/use-financial-state';

import styles from './financial-list-item.module.scss';

const style = createStyleHelper(styles, 'financial-list-item');

export function FinancialListItem({ financial }: { financial: FinancialResponse }) {
    const { state, BadgeStateType } = useFinancialState(financial);

    return (
        <Box className={style()}>
            <Gap className={style('header')} direction="horizontal">
                <Gap>
                    <div>
                        <div className={style('title')}>{financial.month}</div>
                        <Gap direction="horizontal" size={GapSize.SMALL}>
                            <Badge size={BadgeSize.CAPTION} type={BadgeType.SUCCESS}>
                                {financial.month}
                            </Badge>
                            <Badge size={BadgeSize.CAPTION} type={BadgeType.INFO}>
                                novos pacientes: {financial.newPetsCount}
                            </Badge>
                            {financial?.consultationsCount ? (
                                <Badge size={BadgeSize.CAPTION} type={BadgeType.INFO}>
                                    consultas: {financial.consultationsCount}
                                </Badge>
                            ) : null}
                            <Badge size={BadgeSize.CAPTION} type={BadgeStateType}>
                                status: {state}
                            </Badge>
                        </Gap>
                    </div>
                </Gap>
                <Gap>
                    <ContextNavLink to={'/dashboard/financial/' + financial.id}>
                        <Button hasIcon variant={ButtonVariant.ACTION}>
                            <MaterialSymbol name={'arrow_outward'} />
                        </Button>
                    </ContextNavLink>
                </Gap>
            </Gap>
        </Box>
    );
}
