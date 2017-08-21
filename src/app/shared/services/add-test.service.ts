import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database";
import { AddTest } from "../models/add-test";

@Injectable()
export class AddTestService {
        tests2: FirebaseListObservable<any[]>;
    
    private basePath: string = 'questions/';
    public test: FirebaseObjectObservable<any> = null;
    public tests: FirebaseListObservable<AddTest[]> = null;

    constructor(private db: AngularFireDatabase) { }


    getTests(): FirebaseListObservable<AddTest[]> {
        const itemPath = `${this.basePath}`;
        this.tests = this.db.list(itemPath);
        return this.tests;
    }
    getTests2(key): FirebaseListObservable<AddTest[]> {
        const itemPath = `${this.basePath}/${key}`;
        this.tests2 = this.db.list(itemPath);
        console.log(key);
        return this.tests2;
    }
    getOneTest(key: string): FirebaseObjectObservable<any> {
        const itemPath = `${this.basePath}/${key}`
        this.test = this.db.object(itemPath)
        return this.test;
    }

    addTest(obj) {
        this.tests2.push(obj);
    }

    addNewTest(nameTest: string) {
        this.tests.push({ name_test: nameTest })
            .catch(error => console.log('ОШИБКА'));
    }
    updateOneTest(key, obj): void {
        this.tests2.update(key, obj)
    }
    removeTest(key) {
        this.tests.remove(key);
    }
}