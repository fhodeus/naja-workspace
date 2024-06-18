import { PetContainer } from './container/pet/pet';
import { PetProfileContainer } from './container/pet-profile/pet-profile';

export const petRoutes = [
    {
        path: 'profile/:petId/:userId',
        element: <PetProfileContainer />,
    },
    {
        path: ':userId/:petId',
        element: <PetContainer />,
    },
    {
        path: ':userId/:petId/:consultationId',
        element: <PetContainer />,
    },
];
