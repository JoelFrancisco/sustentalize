export class User {
  public id: number;
  public username: string;
  public email: string;
  public password: string;
  public activation_id: string;
  public activated: boolean;
  
  constructor(id: number, username: string, email: string, password: string, activation_id: string, activated: boolean) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.activated = activated;
    this.activation_id = activation_id;
  }
}