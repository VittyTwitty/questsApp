import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database";
import { AddTest } from "../models/add-test";

@Injectable()
export class AddTestService {
    private basePath: string = 'questions/';
    public test: FirebaseObjectObservable<AddTest> = null;
    public tests: FirebaseListObservable<AddTest[]> = null;

    constructor(private db: AngularFireDatabase) { }


    getTests(): FirebaseListObservable<AddTest[]> {
        const itemPath = `${this.basePath}`;
        this.tests = this.db.list(itemPath);
        return this.tests;
    }
    getOneTest(key: string): FirebaseObjectObservable<AddTest> {
        const itemPath = `${this.basePath}/${key}`
        this.test = this.db.object(itemPath)
        return this.test;
    }



    addNewTest(item: any) {
        this.tests.push(item)
            .catch(error => console.log('ОШИБКА'))
    }
}