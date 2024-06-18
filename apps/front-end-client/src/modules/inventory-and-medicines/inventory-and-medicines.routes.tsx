import { Navigate } from 'react-router-dom';

import { FormPage } from './components/form-page/form-page';
import { InventoryAndMedicinesContainer } from './container/inventory-and-medicine/inventory-and-medicine';
import { InventoryAndMedicinesProfileContainer } from './container/inventory-and-medicine-profile/inventory-and-medicine-profile';
import { InventoryAndMedicinesListContainer } from './container/inventory-and-medicines/inventory-and-medicines';

export const inventoryRoutes = [
    {
        index: true,
        element: <InventoryAndMedicinesListContainer />,
    },
    {
        path: ':id',
        element: <InventoryAndMedicinesContainer />,
    },
    {
        path: 'create',
        element: <FormPage />,
    },
    {
        path: 'profile/:id',
        element: <InventoryAndMedicinesProfileContainer />,
    },
    {
        path: '*',
        element: <Navigate to="/dashboard/invertory-and-medicine" />,
    },
];
