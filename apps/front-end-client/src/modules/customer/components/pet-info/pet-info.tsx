import React from 'react';

import {
    Button,
    ButtonSize,
    ButtonVariant,
    Divider,
    Gap,
    GapSize,
    MaterialSymbol,
} from '@endeavour/ui-kit';
import type { PetResponse } from '@endeavour/verification-integration';

import { useGuardRole } from '../../../main/hooks/use-guard-role';
import { PetInfoProfile } from '../../../pets/components/pet-info-profile/pet-info-profile';
import { ContextLink } from '../../../shared/components/context-link/context-link';
import { LabelData } from '../../../shared/components/label-data/label-data';
// import { WebCamComponent } from '../../../shared/components/web-cam/web-cam';
import { createStyleHelper } from '../../../shared/utils/class-names';

import styles from './pet-info.module.scss';

const style = createStyleHelper(styles, 'pet-info');

export const PetInfo = ({ pet, customerId }: { pet: PetResponse; customerId: string }) => {
    const isEditable = useGuardRole('admin');

    return (
        <Gap>
            <Gap direction="horizontal" className={style('client-header')}>
                <Gap direction="horizontal">
                    {/* <div>
                        <WebCamComponent />
                    </div> */}
                    <LabelData label={'Pet'} data={pet.name} />
                </Gap>
                <div>
                    <Gap direction="horizontal" size={GapSize.MEDIUM}>
                        {isEditable ? (
                            <ContextLink to={'/dashboard/pet/' + customerId + '/' + pet.id}>
                                <Button
                                    variant={ButtonVariant.ACTION}
                                    size={ButtonSize.SMALL}
                                    hasIcon
                                >
                                    <MaterialSymbol name="edit" />
                                </Button>
                            </ContextLink>
                        ) : null}
                        <ContextLink to={'/dashboard/pet/profile/' + pet.id + '/' + customerId}>
                            <Button variant={ButtonVariant.ACTION} size={ButtonSize.SMALL} hasIcon>
                                <MaterialSymbol name="arrow_outward" />
                            </Button>
                        </ContextLink>
                    </Gap>
                </div>
            </Gap>
            <Divider />
            <PetInfoProfile pet={pet} />
        </Gap>
    );
};
