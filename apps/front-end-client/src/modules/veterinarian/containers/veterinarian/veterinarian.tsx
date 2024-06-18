import { Suspense, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Divider, Gap, Title } from '@endeavour/ui-kit';

import { veterinarianService } from '../../../../service/veterinarian.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { Loader } from '../../../shared/components/loader/loader';
import { useContextNavigate } from '../../../shared/hooks/use-context-navigate';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { Await } from '../../../shared/utils/loader';
import { VeterinarianForm } from '../../components/veterinarian-form/veterinarian-form';
import type { IVeterinarianProfile } from '../../components/veterinarian-form/veterinarian-form.schema';

import styles from './veterinarian.module.scss';

const style = createStyleHelper(styles, 'veterinarian');

export const VeterinarianContainer = () => {
    useDashboardHeader('Veterinário');

    const params = useParams();
    const [loading, setLoading] = useState(false);

    const navigate = useContextNavigate();

    const loader = { response: veterinarianService.getVeterinarian(params.id ?? '') };

    const postVeterinarian = async (payload: IVeterinarianProfile) => {
        setLoading(true);
        const config = { query: payload.id, payload: { ...payload, bod: payload.dob } };

        const send = !payload.id
            ? veterinarianService.createVeterinarian
            : veterinarianService.updateVeterinarian;

        const { content } = await send.bind(veterinarianService, config)();

        navigate(`/dashboard/veterinarian/profile/${content.id}`);
    };

    return (
        <Suspense
            fallback={useMemo(
                () => (
                    <Loader />
                ),
                [],
            )}
        >
            <Await resolve={loader.response}>
                {({ content }) => (
                    <Gap className={style(undefined)}>
                        <Title>
                            {!content?.id
                                ? ' Registrar novo veterinário'
                                : 'Editar Registro de veterinário'}
                        </Title>
                        <Divider />
                        <VeterinarianForm
                            veterinarian={content}
                            onSubmit={postVeterinarian}
                            loading={loading}
                        />
                    </Gap>
                )}
            </Await>
        </Suspense>
    );
};
