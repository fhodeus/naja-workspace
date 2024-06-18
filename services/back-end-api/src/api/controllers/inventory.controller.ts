import {
    GenericResponse,
    InventoryResponse,
    BaseInventory,
    InventoryResponseViewModel,
} from '@endeavour/verification-integration';
import {
    Body,
    CurrentUser,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    UseAfter,
} from 'routing-controllers';
import { Service } from 'typedi';
import { Inventory } from '../models/inventory.model';
import { InventoryService } from '../services/inventory.service';
import { DoseInventory } from '../models/dose-inventory.model';
import { DoseInventoryService } from '../services/dose-inventory.service';
import { mapResponseToDTO } from '../../lib/dto';
import { ErrorHandlerMiddleware } from '../middlewares/error.middleware';
import { InventoryEmail } from '../services/email/inventory.email';

@Service()
@JsonController('/inventory')
@UseAfter(ErrorHandlerMiddleware)
export class InventoryController {
    constructor(
        private inventoryService: InventoryService,
        private doseInventoryService: DoseInventoryService,
        private inventoryEmail: InventoryEmail
    ) {}

    @Get()
    public async find(
        @CurrentUser() user?: any,
    ): Promise<GenericResponse<InventoryResponseViewModel[]>> {
        const inventoryList = await this.inventoryService.find();

        const inventoryViewModel: InventoryResponseViewModel[] = inventoryList.map((inventory) => {
            return {
                ...inventory,
                used: inventory.doseInventory.filter((e) => !!e.consultationId).length,
            };
        });

        return { content: inventoryViewModel };
    }

    @Get('/find-in-stock')
    public async findInventoryInStock(): Promise<GenericResponse<InventoryResponse[]>> {
        const inventoryList = await this.inventoryService.findInStock();
        return { content: inventoryList };
    }

    @Get('/:id')
    public async one(
        @Param('id') id: string,
    ): Promise<GenericResponse<InventoryResponseViewModel | undefined>> {
        const inventory = await this.inventoryService.findOne(id);

        if (!!inventory) {
            const inventoryViewModel = {
                ...inventory,
                used: inventory.doseInventory.filter((e) => !!e.consultationId).length,
            };
            return { content: inventoryViewModel };
        }

        return undefined;
    }

    @Post()
    public async create(
        @Body({ required: true }) body: BaseInventory,
    ): Promise<GenericResponse<InventoryResponse>> {
        const inventory = mapResponseToDTO<Inventory, typeof body>(body);

        const newInventory = await this.inventoryService.create(inventory);

        const promiseArray = Array.from({ length: newInventory.quantity }, () => {
            return new Promise<void>(async (resolve, reject) => {
                const newDoseInventory = new DoseInventory();
                newDoseInventory.inventoryId = newInventory.id;
                newDoseInventory.lote = '';

                const DoseInventoryCreated = await this.doseInventoryService.create(
                    newDoseInventory,
                );

                if (DoseInventoryCreated) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
        await Promise.all(promiseArray);

        return { content: newInventory };
    }

    @Put('/:id')
    public async update(
        @Param('id') id: string,
        @Body({ required: true }) body: BaseInventory,
    ): Promise<GenericResponse<InventoryResponse>> {
        const inventory = mapResponseToDTO<Inventory, typeof body>(body);

        const newInventory = await this.inventoryService.update(id, inventory);
        return { content: newInventory };
    }

    @Post('/notification/:id')
    public async notification(@Param('id') id: string): Promise<GenericResponse<boolean>> {
        try {
            await this.inventoryEmail.sendStockNotification(id);
            return { content: true };
        } catch (error) {
            return { content: false };
        }
    }
}
