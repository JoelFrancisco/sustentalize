import { SenderCredentials } from '../../entities/SenderCredentials';
import { MailOptions } from '../../entities/MailOptions';

export interface IMail {
  sendEmail(senderCredentials: SenderCredentials, mailOptions: MailOptions): Promise<boolean>;
}