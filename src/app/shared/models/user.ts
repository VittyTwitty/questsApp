export class User {
    public email: string;
    public password: string;
    public name: string;
    

    constructor(data) {
        this.email = data.email;
        this.password = data.password;
        this.name = data.name;
    }

}