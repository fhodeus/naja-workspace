import { Service } from 'typedi';
import nodemailer from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';

@Service()
export class EmailService {
    from = 'bxnandoxd@edu.unifil.br';

    transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        tls: {
            rejectUnauthorized: true,
        },
        auth: {
            user: 'bxnandoxd@edu.unifil.br',
            pass: '1a1a1a2s3d',
        },
    });

    public async sendEmail(
        to: string[],
        subject: string = 'Subject of your email',
        content: string = '<p>Your html here</p>',
        attachments ?: Attachment[]
    ): Promise<any> {
        const mailOptions = {
            from: this.from, // sender address
            to: to, // receiver (use array of string for a list)
            subject: subject, // Subject line
            html: content, // plain text body
            attachments: attachments
        };

        this.transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err);
            else console.log(info);
        });
    }
}
