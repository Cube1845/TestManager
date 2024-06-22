import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ HeaderComponent, NavBarComponent, RouterOutlet ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
}) 
export class HomePageComponent {
}
