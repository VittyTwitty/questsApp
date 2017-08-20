import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import '../styles/styles.scss';
import '../styles/headings.css';
import { HomePageModule } from "./home/home.module";
import { QuestionsListComponent } from "./questions-list/questions-list.component";
import { QuestionsItemComponent } from "./questions-item/questions-item.component";
import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { QuestionService } from "./shared/questions.service";
import { QuestionsResultComponent } from "./questions-result/questions-result.component";
import { SharedModule } from "./shared/shared.module";
import { QuestionModule } from "./questions/questions.module";
import { AuthService } from "./core/auth.service";
import { LoginPageModule } from "./login-page/login-page.module";
import { AuthGuard } from "./core/auth-guard.service";
import { LocalStorageService } from "./core/local-storage.service";
import { UserService } from "./core/user.service";
import { SharedService } from "./shared/services/shared.service";


import 'chart.js';
import { ValidationPatternsService } from "./shared/services/validation-patterns.service";
import { AdminModule } from "./admin/admin.module";
import { TrueAnswersResolver } from "./shared/services/true-anwsers.resolver";
import { CountService } from "./shared/services/count.service";
import { RoleGuard } from "./core/role-guard.service";
import { QuestionGuard } from "./shared/question-guard";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdNativeDateModule } from "@angular/material";
import { AddTestService } from "./shared/services/add-test.service";

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};
export const firebaseConfig = {
  apiKey: "AIzaSyB317U7_q357AO3NMeBmUznWLuEdWCf0wU",
  authDomain: "quesinator-f7538.firebaseapp.com",
  databaseURL: "https://quesinator-f7538.firebaseio.com",
  projectId: "quesinator-f7538",
  storageBucket: "quesinator-f7538.appspot.com",
  messagingSenderId: "24618923572"
};
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HomePageModule,
    AdminModule,
    QuestionModule,
    LoginPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MdNativeDateModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    QuestionService,
    AuthService,
    LocalStorageService,
    AuthGuard,
    RoleGuard,
    QuestionGuard,
    UserService,
    SharedService,
    ValidationPatternsService,
    TrueAnswersResolver,
    CountService,
    AddTestService
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) { }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
