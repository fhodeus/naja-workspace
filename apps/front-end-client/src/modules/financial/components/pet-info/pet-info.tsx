import React from 'react';

import {
    Gap,
    Button,
    ButtonVariant,
    ButtonSize,
    MaterialSymbol,
    Divider,
    GapSize,
} from '@endeavour/ui-kit';
import type { PetResponse } from '@endeavour/verification-integration';

import { PetInfoProfile } from '../../../pets/components/pet-info-profile/pet-info-profile';
import { ContextNavLink } from '../../../shared/components/context-nav-link/context-nav-link';
import { LabelData } from '../../../shared/components/label-data/label-data';
// import { WebCamComponent } from '../../../shared/components/web-cam/web-cam';
import { createStyleHelper } from '../../../shared/utils/class-names';

import styles from './pet-info.module.scss';

const style = createStyleHelper(styles, 'pet-info');

export const PetInfo = ({ pet, customerId }: { pet: PetResponse; customerId: string }) => {
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
                        <ContextNavLink to={'/dashboard/pet/profile/' + pet.id + '/' + customerId}>
                            <Button variant={ButtonVariant.ACTION} size={ButtonSize.SMALL} hasIcon>
                                <MaterialSymbol name="arrow_outward" />
                            </Button>
                        </ContextNavLink>
                    </Gap>
                </div>
            </Gap>
            <Divider />
            <PetInfoProfile pet={pet} />
        </Gap>
    );
};
