import { VeterinarianContainer } from './containers/veterinarian/veterinarian';
import { VeterinarianList } from './containers/veterinarian-list/veterinarian-list';
import { VeterinarianProfile } from './containers/veterinarian-profile/veterinarian-profile';

export const PROFILE_ROUTE = 'profile/:id';
export const CREATE_ROUTE = ':id';

export const veterinarianRoutes = [
    {
        index: true,
        element: <VeterinarianList />,
    },
    {
        path: PROFILE_ROUTE,
        element: <VeterinarianProfile />,
    },
    {
        path: CREATE_ROUTE,
        element: <VeterinarianContainer />,
    },
];
