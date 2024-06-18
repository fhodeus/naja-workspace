import { FinancialContainer } from './container/financial/financial';
import { FinancialListContainer } from './container/financial-list/financial-list';


export const financialRoutes = [
    {
        index: true,
        element: <FinancialListContainer />,
    },
    {
        path: ':financialId',
        element: <FinancialContainer />,
    },
];
