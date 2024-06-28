import { Routes } from '@angular/router';
import { LoginPanelComponent } from './components/manager/auth/login-panel/login-panel.component';
import { HomePageComponent } from './components/manager/home-page/home-page.component';
import { QuestionsComponent } from './components/manager/home-page/content/questions/questions.component';
import { RegisterPanelComponent } from './components/manager/auth/register-panel/register-panel.component';

export const routes: Routes = [
    { 'path': 'login', 'component': LoginPanelComponent },
    { 'path': 'register', 'component': RegisterPanelComponent },
    { 'path': 'home', 'component': HomePageComponent, children: [
        { 'path': 'questions', 'component': QuestionsComponent },
    ]},
    { 'path': '**', 'pathMatch': 'full', 'redirectTo': 'login'},
];
