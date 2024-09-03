
import {
    Box,
    Button,
    ButtonVariant,
    Divider,
    Gap,
    ButtonSize,
    MaterialSymbol,
    GapSize,
    Title,
    ContentId,
} from '@endeavour/ui-kit';
import type {
    ConsultationResponse,
    PetResponse,
    UserResponse,
} from '@endeavour/verification-integration';

import { Calendar } from '../../../shared/components/calendar/calendar';
import { ContextLink } from '../../../shared/components/context-link/context-link';
import { JavascriptStructure } from '../../../shared/components/javascript-structure/javascript-structure';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { PetInfoProfile } from '../pet-info-profile/pet-info-profile';

import styles from './pet-page.module.scss';

const style = createStyleHelper(styles, 'pet-page');

export function PetPage({
    customer,
    pet,
    consultations,
}: {
    pet: PetResponse;
    customer: UserResponse;
    consultations?: ConsultationResponse[];
}) {
    return (
        <Gap className={style(undefined)}>
            <Title>Pet</Title>
            <Divider />
            <Box>
                <Gap>
                    <div className={style('client-header')}>
                        <div>
                            <div className={style('client-name')}>{pet.name}</div>
                            <ContentId>{pet.id}</ContentId>
                        </div>
                        <div>
                            <Gap direction="horizontal" size={GapSize.MEDIUM}>
                                <ContextLink to={'/dashboard/pet/' + customer.id + '/' + pet.id}>
                                    <Button
                                        variant={ButtonVariant.ACTION}
                                        size={ButtonSize.SMALL}
                                     
                                        hasIcon
                                    >
                                        <MaterialSymbol name="edit" />
                                    </Button>
                                </ContextLink>
                                <ContextLink to={'/dashboard/consultations/' + pet.id}>
                                    <Button
                                        variant={ButtonVariant.ACTION}
                                        size={ButtonSize.SMALL}
                                        hasIcon
                                    >
                                        <MaterialSymbol name="medical_services" />
                                    </Button>
                                </ContextLink>
                            </Gap>
                        </div>
                    </div>
                    <Divider />
                    <PetInfoProfile pet={pet} />
                    <Divider />
                    <div className={style('client-info-footer')}>
                        <JavascriptStructure data={pet} />
                    </div>
                </Gap>
            </Box>
            <Box>
                {consultations ? (
                    <Calendar
                        events={consultations.map((e) => ({
                            title: e.id,
                            start: new Date(e.day + 'T' + e.startTime),
                            end: new Date(e.day + 'T' + e.endTime),
                            extendedProps: { ...e },
                        }))}
                    />
                ) : null}
            </Box>
        </Gap>
    );
}
