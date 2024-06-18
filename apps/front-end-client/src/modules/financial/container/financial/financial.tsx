import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
    Badge,
    BadgeSize,
    BadgeType,
    Box,
    Button,
    ButtonVariant,
    ContentId,
    Divider,
    Gap,
    GapAlign,
    GapSize,
    MaterialSymbol,
    Title,
} from '@endeavour/ui-kit';
import type {
    ConsultationResponse,
    Financial,
    InventoryResponseViewModel,
    PetResponse,
} from '@endeavour/verification-integration';

import { financialService } from '../../../../service/fianancial.service';
import { useDashboardHeader } from '../../../main/hooks/use-dashboard-header';
import { LabelData } from '../../../shared/components/label-data/label-data';
import { Loader } from '../../../shared/components/loader/loader';
import { createStyleHelper } from '../../../shared/utils/class-names';
import { InventoryListItemComponent } from '../../components/inventory-list-item/inventory-list-item';
import { PetInfo } from '../../components/pet-info/pet-info';
import { getFinancialState } from '../../hooks/use-financial-state';

import styles from './financial.module.scss';

const style = createStyleHelper(styles, 'financial-container');

export const FinancialContainer = () => {
    const params = useParams();
    const [financial, setFinancial] = useState<Financial>();
    const [consultation, setConsultation] = useState<ConsultationResponse[]>([]);
    const [inventories, setInventories] = useState<InventoryResponseViewModel[]>([]);
    const [pets, setPets] = useState<PetResponse[]>([]);
    const { state, BadgeStateType } = getFinancialState(financial);
    useDashboardHeader('Balanço Financeiro');
    const [loading, setLoading] = useState<boolean>(true);

    const findFinancial = useCallback(async () => {
        setLoading(true);

        const result = await financialService.getFinancial(params.financialId ?? '');

        setFinancial(result.content.financial);
        setConsultation(result.content.consultations);
        setInventories(result.content.newInventories);
        setPets(result.content.newPets);

        setLoading(false);
    }, [params.financialId]);

    const faturar = useCallback(async () => {
        const result = await financialService.faturar(financial?.id ?? '');
        setFinancial(result.content);
    }, [financial?.id]);

    useEffect(() => {
        findFinancial();
    }, [findFinancial]);

    if (loading || !financial) {
        return <Loader />;
    }

    const dataStringStart = financial.startTime;
    const dataStringEnd = financial.endTime;

    // Converter a string para um objeto Date
    const dataObjStart = new Date(dataStringStart);
    const dataObjEnd = new Date(dataStringEnd);

    // Obter o dia, mês e ano
    const diaStart = String(dataObjStart.getUTCDate()).padStart(2, '0');
    const mesStart = String(dataObjStart.getUTCMonth() + 1).padStart(2, '0'); // Meses são baseados em zero
    const anoStart = dataObjStart.getUTCFullYear();

    // Obter o dia, mês e ano
    const diaEnd = String(dataObjEnd.getUTCDate()).padStart(2, '0');
    const mesEnd = String(dataObjEnd.getUTCMonth() + 1).padStart(2, '0'); // Meses são baseados em zero
    const anoEnd = dataObjEnd.getUTCFullYear();

    // Formatar a data no formato desejado dd/mm/aaaa
    const dataFormatada = `De ${diaStart}/${mesStart}/${anoStart} até ${diaEnd}/${mesEnd}/${anoEnd}`;

    return (
        <div className={style(undefined)}>
            <Box>
                <Gap direction="horizontal" className={style('header')}>
                    <Gap direction="horizontal">
                        <Title>Balanço do Mês {financial.month}</Title>
                        <Gap direction="horizontal" align={GapAlign.CENTER} size={GapSize.SMALL}>
                            <Badge size={BadgeSize.CAPTION} type={BadgeStateType}>
                                status: {state}
                            </Badge>
                        </Gap>
                    </Gap>
                    <div>
                        <Button
                            variant={ButtonVariant.ACTION}
                            onClick={faturar}
                            disabled={state != 'fechado'}
                        >
                            Faturar <MaterialSymbol name="receipt_long" />
                        </Button>
                    </div>
                </Gap>
                <div> {dataFormatada}</div>
            </Box>
            <Divider />
            <Gap direction="horizontal">
                <Gap className={style('box-content')}>
                    <Gap>
                        <div>
                            <Title className={style('title')}>
                                Consultas no Mês de {financial.month}
                            </Title>
                            <div>
                                <p>Total : ({consultation.length})</p>
                            </div>{' '}
                        </div>
                    </Gap>
                    {consultation.map((item) => (
                        <Box key={item.id}>
                            <Gap>
                                <div>
                                    <Gap direction="horizontal" align={GapAlign.CENTER}>
                                        <div className={style('client-name')}>{item.day}</div>
                                        <Gap align={GapAlign.CENTER} direction="horizontal">
                                            <Badge
                                                size={BadgeSize.CAPTION}
                                                type={BadgeType.SUCCESS}
                                            >
                                                status: {item.status}
                                            </Badge>
                                            <Badge
                                                size={BadgeSize.CAPTION}
                                                type={BadgeType.SUCCESS}
                                            >
                                                insumos: {item.doseInventory.length}
                                            </Badge>
                                        </Gap>
                                        <Button
                                            className={style('button-navigate')}
                                            hasIcon
                                            variant={ButtonVariant.ACTION}
                                        >
                                            <MaterialSymbol name="arrow_outward" />
                                        </Button>
                                    </Gap>
                                    <Gap direction="horizontal">
                                        <ContentId>{item.id}</ContentId>
                                    </Gap>
                                </div>
                                <Gap>
                                    <LabelData
                                        label={'Clínico'}
                                        data={item.veterinarian.fullName}
                                    />
                                </Gap>
                            </Gap>
                        </Box>
                    ))}
                </Gap>
                <Divider vertical />
                <Gap className={style('box-content')}>
                    <Gap>
                        <div>
                            <Title className={style('title')}>Entradas no estoque</Title>
                            <div>
                                <p>Total : ({inventories.length})</p>
                            </div>
                        </div>
                        <Gap className={style()}>
                            {inventories.map((inventory) => (
                                <InventoryListItemComponent
                                    inventory={inventory}
                                    key={inventory.id}
                                />
                            ))}

                            {inventories.length === 0
                                ? 'Sem entradas no estoque para o Mês de ' + financial.month
                                : null}
                        </Gap>
                    </Gap>
                    <Divider />
                    <Gap>
                        <Gap>
                            <div>
                                <Title className={style('title')}>
                                    Pacientes registrado no periodo
                                </Title>
                                <p>Total: {pets.length}</p>
                            </div>

                            <Gap>
                                {pets.map((pet) => (
                                    <Box key={pet.id}>
                                        <PetInfo pet={pet} customerId={pet.userId} />
                                    </Box>
                                ))}
                            </Gap>

                            {pets.length === 0
                                ? 'Sem pacientes registrados no Mês de ' + financial.month
                                : null}
                        </Gap>
                    </Gap>
                </Gap>
            </Gap>
        </div>
    );
};
