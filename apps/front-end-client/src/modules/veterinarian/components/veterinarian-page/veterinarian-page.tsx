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
    VeterinarianResponse,
} from '@endeavour/verification-integration';

import { Calendar } from '../../../shared/components/calendar/calendar';
import { ContextNavLink } from '../../../shared/components/context-nav-link/context-nav-link';
import { JavascriptStructure } from '../../../shared/components/javascript-structure/javascript-structure';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { VeterinarianInfoComponent } from '../veterinarian-info/veterinarian-info';

import styles from './veterinarian-page.module.scss';

const style = createStyleHelper(styles, 'veterinarian-page');

export function PetPage({
    veterinarian,
    consultations,
}: {
    veterinarian: VeterinarianResponse;
    consultations?: ConsultationResponse[];
}) {
    return (
        <Gap className={style(undefined)}>
            <Title>Veterinário</Title>
            <Divider />
            <Box>
                <Gap>
                    <div className={style('client-header')}>
                        <div>
                            <div className={style('client-name')}>{veterinarian.fullName}</div>
                            <ContentId>{veterinarian.id}</ContentId>
                        </div>
                        <Gap direction="horizontal" size={GapSize.MEDIUM}>
                            <ContextNavLink to={'/dashboard/veterinarian/' + veterinarian.id}>
                                <Button
                                    variant={ButtonVariant.ACTION}
                                    size={ButtonSize.SMALL}
                                    hasIcon
                                >
                                    <MaterialSymbol name="edit" />
                                </Button>
                            </ContextNavLink>
                        </Gap>
                    </div>
                    <Divider />
                    <VeterinarianInfoComponent veterinarian={veterinarian} />
                    <Divider />
                    <div className={style('client-info-footer')}>
                        <JavascriptStructure data={veterinarian} />
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
