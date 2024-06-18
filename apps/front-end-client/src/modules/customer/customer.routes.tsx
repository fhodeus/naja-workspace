import { CustomerContainer } from './container/customer/customer';
import { CustomerListContainer } from './container/customer-list/customer-list';
import { CustomerProfileContainer } from './container/customer-profile/customer-profile';

export const PROFILE_ROUTE = 'profile/:id';
export const CREATE_ROUTE = ':id';

export const customerRoutes = [
    {
        index: true,
        element: <CustomerListContainer />,
    },
    {
        path: PROFILE_ROUTE,
        element: <CustomerContainer />,
    },
    {
        path: CREATE_ROUTE,
        element: <CustomerProfileContainer />,
    },
];
