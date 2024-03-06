import nodemailer from 'nodemailer'
import { getEmailHTML } from '../utils/resources/getEmailHTML';
import { ServiceError } from '../error/ServiceError';

export class EmailService {

    async sendConfirmationCode(code: string, userName: string, userEmail: string) {
        try {
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "ca046e1cb94904",
                    pass: "525282848168ac"
                }
            });
            let mailOptions = {
                from: 'sender@email.com',
                to: userEmail,
                subject: "Confirmação de email",
                html: getEmailHTML(userName, code),
            };
            await transport.sendMail(mailOptions)
        } catch (error) {
            throw new ServiceError("Erro ao enviar email.")
        }
    }
}