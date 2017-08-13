export class Questions {
    public question: string;
    public answer: any;
    public correct: number;

    constructor(data) {
        this.answer = data.answer;
        this.question = data.question;
        this.correct = data.correct;
    }

}