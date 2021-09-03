import { createTransport } from 'nodemailer';

import { IMail } from '../IMail';
import { SenderCredentials } from '../../../entities/SenderCredentials';
import { MailOptions } from '../../../entities/MailOptions';

export class Nodemailer implements IMail {
  async sendEmail(senderCredentials: SenderCredentials, mailOptions: MailOptions) {
    const transporter = createTransport({
      service: senderCredentials.service,
      auth: {
        user: senderCredentials.username,
        pass: senderCredentials.password,
      }
    });
    
    transporter.sendMail(mailOptions, (err: any, info: any) => {
      if (err) 
        return false;
    });

    return true;
  }
}