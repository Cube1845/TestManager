import { Routes } from '@angular/router';
import { LoginPanelComponent } from './components/manager/login-panel/login-panel.component';
import { HomePageComponent } from './components/manager/home-page/home-page.component';
import { QuestionsComponent } from './components/manager/home-page/content/questions/questions.component';

export const routes: Routes = [
    { 'path': 'login', 'component': LoginPanelComponent },
    { 'path': 'home', 'component': HomePageComponent, children: [
        { 'path': 'questions', 'component': QuestionsComponent },
    ]},
    { 'path': '**', 'pathMatch': 'full', 'redirectTo': 'login'},
];
