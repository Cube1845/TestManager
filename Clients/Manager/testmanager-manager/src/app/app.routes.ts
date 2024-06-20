import { Routes } from '@angular/router';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';

export const routes: Routes = [
    { 'path': 'login', 'component': LoginPanelComponent },
    { 'path': '**', 'pathMatch': 'full', 'redirectTo': 'login'},
];
