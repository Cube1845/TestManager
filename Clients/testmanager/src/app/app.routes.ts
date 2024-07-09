import { Routes } from '@angular/router';
import { LoginPanelComponent } from './components/manager/auth/login-panel/login-panel.component';
import { HomePageComponent } from './components/manager/home-page/home-page.component';
import { QuestionsComponent } from './components/manager/home-page/content/questions/questions.component';
import { RegisterPanelComponent } from './components/manager/auth/register-panel/register-panel.component';
import { mustBeLoggedInGuard } from './guards/auth/must-be-logged-in.guard';
import { mustNotBeLoggedInGuard } from './guards/auth/must-not-be-logged-in.guard';
import { QuestionBaseEditComponent } from './components/manager/home-page/content/questions/question-base-edit/question-base-edit.component';
import { BaseManagerComponent } from './components/manager/home-page/content/questions/base-manager/base-manager.component';
import { questionBaseMustBeSelectedGuard } from './guards/questions/question-base-must-be-selected.guard';

export const routes: Routes = [
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
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
