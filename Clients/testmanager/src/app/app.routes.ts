import { Routes } from '@angular/router';
import { LoginPanelComponent } from './components/manager/auth/login-panel/login-panel.component';
import { HomePageComponent } from './components/manager/home-page/home-page.component';
import { QuestionsComponent } from './components/manager/home-page/content/questions/questions.component';
import { RegisterPanelComponent } from './components/manager/auth/register-panel/register-panel.component';
import { mustBeLoggedInGuard } from './guards/must-be-logged-in.guard';
import { mustNotBeLoggedInGuard } from './guards/must-not-be-logged-in.guard';

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
    children: [{ path: 'questions', component: QuestionsComponent }],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
