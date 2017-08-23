export class UserAuth {
  public email: string;
  public name: string;
  public uid: string;

  constructor(data) {
    this.email = data.email;
    this.name = data.name;
    this.uid = data.uid;
  }

}
