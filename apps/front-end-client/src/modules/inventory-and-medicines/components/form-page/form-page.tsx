/* eslint-disable @arthurgeron/react-usememo/require-usememo */
import React, { useState } from 'react';

import { Gap, Title } from '@endeavour/ui-kit';
import type { InventoryResponse } from '@endeavour/verification-integration';

import { inventoryService } from '../../../../service/inventory.service';
import { useContextNavigate } from '../../../shared/hooks/use-context-navigate';
import { InventorieForm } from '../inventorie-form/inventorie-form';
import type { IInventoryProfile } from '../inventorie-form/inventorie-form.schema';

export function FormPage({ content }: { content?: InventoryResponse }) {
    const navigate = useContextNavigate();
    const [loading, setLoading] = useState(false);

    const postInventorie = async (payload: IInventoryProfile) => {
        setLoading(true);
        const config = { query: payload.id, payload };

        const send = !payload.id
            ? inventoryService.createInventory
            : inventoryService.updateInventory;

        const { content } = await send.bind(inventoryService, config)();

        navigate(`/dashboard/invertory-and-medicine/profile/${content.id}`);
    };

    return (
        <Gap>
            <Title>
                {!content?.id ? 'Registrando novo item no Estoque' : 'Atualizando item no Estoque'}
            </Title>
            <InventorieForm inventory={content} onSubmit={postInventorie} loading={loading} />
        </Gap>
    );
}
