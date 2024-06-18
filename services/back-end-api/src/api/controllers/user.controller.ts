import {
    Body,
    JsonController,
    Delete,
    Get,
    OnUndefined,
    Param,
    Post,
    Put,
    Authorized,
    UseAfter,
    QueryParams,
} from 'routing-controllers';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { UserNotFoundError } from '../errors/user.errors';
import { Service } from 'typedi';
import { BaseUser, CreateUserBody, GenericResponse } from '@endeavour/verification-integration';
import { DeleteResult } from 'typeorm';
import { ErrorHandlerMiddleware } from '../middlewares/error.middleware';
import { EmailService } from '../services/email/gateway/email.adapter';
import { UserEmail } from '../services/email/user.email';
import { KeycloakClient } from '../services/keycloak/keycloak.service';

@Service()
@Authorized()
@UseAfter(ErrorHandlerMiddleware)
@JsonController('/users')
export class UserController {
    constructor(
        private userService: UserService,
        private emailService: EmailService,
        private customerEmail: UserEmail,
        private _keycloakClient: KeycloakClient,
    ) {}

    @Get()
    public async find(
        @QueryParams({ required: false, validate: false })
        query?: {
            name?: string;
            document?: string;
        },
    ): Promise<GenericResponse<User[]>> {
        const users = await this.userService.find(query.name, query.document);
        
       console.log(this._keycloakClient);
        return { content: users };
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    public async one(@Param('id') id: string): Promise<GenericResponse<User | undefined>> {
        const user = await this.userService.findOne(id);
        return { content: user };
    }

    @Post()
    public async create(@Body() body: CreateUserBody): Promise<GenericResponse<User>> {
        const user: User = new User();

        user.email = body.email;
        user.fullName = body.fullName;
        user.address = body.address;
        user.telephone = body.telephone;
        user.bod = body.bod;
        user.profession = body.profession;
        user.medicalHistory = body.medicalHistory;
        user.document = body.document;
        user.pets = [];

        const createdUser = await this.userService.create(user);

        this.emailService.sendEmail(
            ['bxnandoxd@edu.unifil.br'],
            'Novo usuario Criado',
            `Usuario ${createdUser.fullName}`,
        );
        return { content: createdUser };
    }

    @Post('/export/:id')
    public async export(@Param('id') id: string): Promise<GenericResponse<boolean>> {
        try {
            await this.customerEmail.sendExportNotification(id);
            this.customerEmail.sendExportPetsNotification(id);
            return { content: true };
        } catch (error) {
            return { content: false };
        }
    }

    @Put('/:id')
    public async update(
        @Param('id') id: string,
        @Body() body: BaseUser,
    ): Promise<GenericResponse<User>> {
        const user = new User();

        user.email = body.email;
        user.fullName = body.fullName;
        user.address = body.address;
        user.telephone = body.telephone;
        user.document = body.document;

        user.bod = body.bod;
        user.profession = body.profession;
        user.medicalHistory = body.medicalHistory;
        user.pets = [];

        const updatedUser = await this.userService.update(id, user);

        return { content: updatedUser };
    }

    @Delete('/:id')
    public async delete(@Param('id') id: string): Promise<GenericResponse<DeleteResult>> {
        const result = await this.userService.delete(id);
        return { content: result };
    }
}
