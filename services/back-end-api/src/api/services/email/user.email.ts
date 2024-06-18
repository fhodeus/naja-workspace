import { Service } from 'typedi';

import { EmailService } from './gateway/email.adapter';
import { UserService } from '../user.service';
import { PetService } from '../pet.service';
import { Attachment } from 'nodemailer/lib/mailer';
import { json2csv } from 'json-2-csv';

@Service()
export class UserEmail {
    constructor(private customerService: UserService,private petService: PetService, private emailService: EmailService) {}

    public async sendExportNotification(
        id: string,
        title: string = 'export client',
    ): Promise<void> {
        const customer = await this.customerService.findOne(id);
        const customerEmail = customer.email;

        this.emailService.sendEmail(
            [customerEmail, 'bxnandoxd@edu.unifil.br'],
            title,
            `
                <p>Seus Dados ${customer.id}</p>
                <p>Cliente ${customer.fullName}</p>
            `,
            [
                {
                    filename: `${customer.fullName}.json`,
                    content: new Buffer(JSON.stringify(customer, null, '\t'), 'utf-8'),
                },
            ],
        );
        return;
    }

    public async sendExportPetsNotification(
        id: string,
        title: string = 'export pets',
    ): Promise<void> {
        const customer = await this.customerService.findOne(id);
        const customerEmail = customer.email;

        const petsAttachment:Attachment[] = []
        for(const pet of customer.pets){
            const petfinded = await this.petService.findOne(pet.id);
            petsAttachment.push({
                filename: `${petfinded.name}.json`,
                content: new Buffer(JSON.stringify(petfinded, null, '\t'), 'utf-8'),
            })
            petsAttachment.push({
                filename: `${petfinded.name}-consultas.csv`,
                content:  json2csv(petfinded.consultations),
            })
        }

        this.emailService.sendEmail(
            [customerEmail, 'bxnandoxd@edu.unifil.br'],
            title,
            `
                <p>Dados dos seus pets ${customer.id}</p>
                <p>Cliente ${customer.fullName}</p>
            `,
            petsAttachment,
        );
        return;
    }
}
