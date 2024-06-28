import { consultationRoutes } from '../consultations/consultation.routes';
import { customerRoutes } from '../customer/customer.routes';
import { financialRoutes } from '../financial/financial.routes';
import { inventoryRoutes } from '../inventory-and-medicines/inventory-and-medicines.routes';
import { petRoutes } from '../pets/pets.routes';
import { veterinarianRoutes } from '../veterinarian/veterinarian.routes';

import { DashboardContainer } from './containers/dashboard.container';

export const dashBoardRoutes = [
    {
        path: 'dashboard',
        element: <DashboardContainer />,
        children: [
            { path: 'customer', children: customerRoutes },
            { path: 'consultations', children: consultationRoutes },
            { path: 'financial', children: financialRoutes },
            { path: 'invertory-and-medicine', children: inventoryRoutes },
            { path: 'pet', children: petRoutes },
            { path: 'veterinarian', children: veterinarianRoutes },
        ],
    },
];
