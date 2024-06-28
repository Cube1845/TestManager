import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Router, RouterOutlet } from '@angular/router';
import { AuthApiService } from '../../../services/auth/auth-api.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ HeaderComponent, NavBarComponent, RouterOutlet ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
}) 
export class HomePageComponent implements OnInit {
  constructor(private readonly authApiService: AuthApiService) {}

  ngOnInit(): void {
    
  }
}
