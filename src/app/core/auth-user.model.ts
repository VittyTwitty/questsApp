export class UserAuth {
    public email: string;
    public name: string;
    

    constructor(data) {
        this.email = data.email;
        this.name = data.name;
    }

}