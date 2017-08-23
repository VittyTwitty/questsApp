import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AddTest } from '../models/add-test';

@Injectable()
export class AddTestService {
  public tests2: FirebaseListObservable<any[]>;

  private basePath: string = 'questions/';
  private test: FirebaseObjectObservable<any> = null;
  private tests: FirebaseListObservable<AddTest[]> = null;

  constructor(private db: AngularFireDatabase) {
  }

  public getTests(): FirebaseListObservable<AddTest[]> {
    const itemPath = `${this.basePath}`;
    this.tests = this.db.list(itemPath);
    return this.tests;
  }

  public getTests2(key): FirebaseListObservable<AddTest[]> {
    const itemPath = `${this.basePath}/${key}`;
    this.tests2 = this.db.list(itemPath);
    return this.tests2;
  }

  public getOneTest(key: string): FirebaseObjectObservable<any> {
    const itemPath = `${this.basePath}/${key}`;
    this.test = this.db.object(itemPath);
    return this.test;
  }

  public addTest(obj) {
    this.tests2.push(obj);
  }

  public addNewTest(nameTest: string) {
    this.tests.push({name_test: nameTest});
  }

  public updateOneTest(key, obj): void {
    this.tests2.update(key, obj);
  }

  public removeTest(key) {
    this.tests.remove(key);
  }
}
