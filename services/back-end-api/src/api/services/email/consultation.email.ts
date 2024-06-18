import { Service } from 'typedi';

import { EmailService } from './gateway/email.adapter';
import { ConsultationService } from '../consultation.service';

@Service()
export class ConsultationEmail {
    constructor(
        private consultationService: ConsultationService,
        private emailService: EmailService,
    ) {}

    public async sendConsultationNotification(
        id: string,
        title: string = 'consulta',
    ): Promise<void> {
        const consultation = await this.consultationService.findOne(id);

        // const customerEmail = consultation.customer.email;
        const veterinarianEmail = consultation.veterinarian.email;

        this.emailService.sendEmail(
            [veterinarianEmail, 'bxnandoxd@edu.unifil.br'],
            title,
            `
                <p>Sua consulta ${consultation.id}</p>
                <p>Paciente ${consultation.pet?.name}</p>
                <p>Veterinário ${consultation.veterinarian?.fullName}</p>
                <p>Acesse o painel para mais informacoes</p>
            `,
        );
        return;
    }
}
