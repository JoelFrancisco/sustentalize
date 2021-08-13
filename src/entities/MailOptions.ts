export class MailOptions {
  public from: string;
  public to: string;
  public subject: string;
  public html: string;
  
  constructor(from: string, to: string, subject: string, html: string) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.html = html;
  }
}