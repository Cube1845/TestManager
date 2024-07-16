import { Routes } from '@angular/router';
import { LoginPanelComponent } from './manager/components/auth/login-panel/login-panel.component';
import { RegisterPanelComponent } from './manager/components/auth/register-panel/register-panel.component';
import { BaseManagerComponent } from './manager/components/home-page/content/questions/base-manager/base-manager.component';
import { QuestionBaseEditComponent } from './manager/components/home-page/content/questions/question-base-edit/question-base-edit.component';
import { QuestionsComponent } from './manager/components/home-page/content/questions/questions.component';
import { TestEditComponent } from './manager/components/home-page/content/tests/test-edit/test-edit.component';
import { TestManagerComponent } from './manager/components/home-page/content/tests/test-manager/test-manager.component';
import { TestsComponent } from './manager/components/home-page/content/tests/tests.component';
import { HomePageComponent } from './manager/components/home-page/home-page.component';
import { mustBeLoggedInGuard } from './manager/guards/auth/must-be-logged-in.guard';
import { mustNotBeLoggedInGuard } from './manager/guards/auth/must-not-be-logged-in.guard';
import { questionBaseMustBeSelectedGuard } from './manager/guards/questions/question-base-must-be-selected.guard';
import { testMustBeSelectedGuard } from './manager/guards/tests/test-must-be-selected.guard';
import { TestPageComponent } from './user/components/test-page/test-page.component';
import { StartComponent } from './user/components/test-page/content/start/start.component';

export const routes: Routes = [
  { path: 'manager', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginPanelComponent,
    canActivate: [mustNotBeLoggedInGuard],
  },
  {
    path: 'register',
    component: RegisterPanelComponent,
    canActivate: [mustNotBeLoggedInGuard],
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [mustBeLoggedInGuard],
    children: [
      {
        path: 'questions',
        component: QuestionsComponent,
        children: [
          {
            path: 'base-edit',
            component: QuestionBaseEditComponent,
            canActivate: [questionBaseMustBeSelectedGuard],
          },
          { path: 'base-manager', component: BaseManagerComponent },
        ],
      },
      {
        path: 'tests',
        component: TestsComponent,
        children: [
          { path: 'manager', component: TestManagerComponent },
          {
            path: 'edit',
            component: TestEditComponent,
            canActivate: [testMustBeSelectedGuard],
          },
        ],
      },
    ],
  },
  {
    path: 'test',
    component: TestPageComponent,
    children: [{ path: 'start', component: StartComponent }],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'test/start' },
];
