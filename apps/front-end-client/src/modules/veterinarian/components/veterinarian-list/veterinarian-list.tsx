import { Gap } from '@endeavour/ui-kit';
import type { VeterinarianResponse } from '@endeavour/verification-integration';

import { createStyleHelper } from '../../../shared/utils/class-names';
import { VeterinarianListItem } from '../veterinarian-list-item/veterinarian-list-item';

import styles from './veterinarian-list.module.scss';

const style = createStyleHelper(styles, 'veterinarian-list');

export const VeterinarianListComponent = ({
    veterinarians,
}: {
    veterinarians: VeterinarianResponse[];
}) => {
    return (
        <Gap className={style()}>
            {veterinarians.map((veterinarian, index) => (
                <VeterinarianListItem key={index} veterinarian={veterinarian} />
            ))}
        </Gap>
    );
};
