export class User {
    public email: string;
    public password: string;
    public name: string;
    public countOfTests?: string;
    public bestCorrectlyAnswer?: string;
    public bestNocorrectlyAnswer?: string;
    

    constructor(data) {
        this.email = data.email;
        this.password = data.password;
        this.countOfTests = data.countOfTests;
        this.bestCorrectlyAnswer = data.bestCorrectlyAnswer;
        this.bestNocorrectlyAnswer = data.bestNocorrectlyAnswer;
    }

}