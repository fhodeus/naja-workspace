import React from 'react';

import type { InventoryResponse } from '@endeavour/verification-integration';

import { ContextNavLink } from '../../../shared/components/context-nav-link/context-nav-link';
import { createStyleHelper } from '../../../shared/utils/class-names';

import styles from './inventory-lote-info.module.scss';

const style = createStyleHelper(styles, 'inventory-lote-info');

export const InventoryLoteInfo = ({ inventory }: { inventory: InventoryResponse }) => {
    return (
        <div className={style()}>
            <table className={style('table')}>
                <thead>
                    <tr className={style('row')}>
                        <th className={style('heading')}>id</th>
                        <th className={style('heading')}>lote</th>
                        <th className={style('heading')}>consulta</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.doseInventory.map((e) => (
                        <tr className={style('row')} key={e.id}>
                            <td className={style('item')}>{e.id}</td>
                            <td className={style('item')}>{e.lote ?? '-'}</td>
                            <td className={style('item')}>
                                {e.consultationId ? (
                                    <ContextNavLink
                                        to={
                                            '/dashboard/consultations/scheduling/' +
                                            e.consultationId
                                        }
                                    >
                                        {e.consultationId ?? '-'}
                                    </ContextNavLink>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
