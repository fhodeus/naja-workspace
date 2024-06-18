import React, { useState, useCallback } from 'react';

import {
    Button,
    Divider,
    Gap,
    GapSize,
    ButtonVariant,
    ButtonSize,
    MaterialSymbol,
    ContentId,
} from '@endeavour/ui-kit';
import type { UserResponse } from '@endeavour/verification-integration';

import { useGuardRole } from '../../../main/hooks/use-guard-role';
import { ContextLink } from '../../../shared/components/context-link/context-link';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { PetInfo } from '../pet-info/pet-info';

import styles from './pet-section.module.scss';

const style = createStyleHelper(styles, 'pet-section');

export const PetSectionComponent = ({ customer }: { customer: UserResponse }) => {
    const isEditable = useGuardRole('admin');

    const [customerPets, setCustomerPets] = useState(
        customer.pets.map((e, i) => ({ ...e, selected: i == 0 })),
    );

    const currentPet = customerPets.find((e) => e.selected);

    const selectPet = useCallback((petId: string) => {
        return () =>
            setCustomerPets((prevPets) =>
                prevPets.map((prevPet) => ({ ...prevPet, selected: prevPet.id === petId })),
            );
    }, []);

    return (
        <>
            <div className={style('client-header')}>
                <Gap direction="horizontal">
                    <div>
                        <div className={style('client-name')}>Pets</div>
                        {currentPet?.id ? <ContentId>{currentPet?.id} </ContentId> : null}
                    </div>
                </Gap>
                <Gap direction="horizontal" size={GapSize.MEDIUM}>
                    {isEditable ? (
                        <div>
                            <ContextLink to={'/dashboard/pet/' + customer.id + '/create'}>
                                <Button
                                    variant={ButtonVariant.ACTION}
                                    size={ButtonSize.SMALL}
                                    hasIcon
                                >
                                    <MaterialSymbol name="add" />
                                </Button>
                            </ContextLink>
                        </div>
                    ) : null}
                    <div>
                        {customerPets.length && isEditable ? (
                            <ContextLink to={'/dashboard/consultations/' + currentPet?.id}>
                                <Button
                                    variant={ButtonVariant.ACTION}
                                    size={ButtonSize.SMALL}
                                    hasIcon
                                >
                                    <MaterialSymbol name="medical_services" />
                                </Button>
                            </ContextLink>
                        ) : null}
                    </div>
                </Gap>
            </div>
            <Divider />
            <div className={style('client-info')}>
                <Gap size={GapSize.MEDIUM}>
                    {customerPets.map((pet, i) => (
                        <Button
                            variant={
                                currentPet?.id == pet.id
                                    ? ButtonVariant.ACTION
                                    : ButtonVariant.LIGHT
                            }
                            key={i}
                            className={style('item-navigation')}
                            onClick={selectPet(pet.id)}
                        >
                            {pet.name}
                        </Button>
                    ))}
                </Gap>
                {currentPet ? (
                    <>
                        <Divider vertical />
                        <PetInfo pet={currentPet} customerId={customer.id} />
                    </>
                ) : (
                    <>Não há pets</>
                )}
            </div>
        </>
    );
};
