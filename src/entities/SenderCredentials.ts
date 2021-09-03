export class SenderCredentials {
  public service: string;
  public username: string;
  public password: string;

  constructor(service: string, username: string, password: string) {
    this.service = service;
    this.username = username;
    this.password = password;
  }
}