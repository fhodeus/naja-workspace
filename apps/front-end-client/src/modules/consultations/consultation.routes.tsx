import { schedulingLoader } from './consultation.loader';
import { ConsultationContainer } from './container/consultation-profile/consultation';
import { Consultations } from './container/consultations/consultations';
import { SchedulingContainer } from './container/scheduling/scheduling';

export const CREATE_CONSULTATION = ':id';

export const consultationRoutes = [
    {
        index: true,
        element: <Consultations />,
    },
    {
        path: CREATE_CONSULTATION,
        element: <ConsultationContainer />,
    },
    {
        path: 'scheduling/:id',
        loader: schedulingLoader,
        element: <SchedulingContainer />,
    },
    {
        path: 'service/:id',
        element: <ConsultationContainer />,
    },
];
