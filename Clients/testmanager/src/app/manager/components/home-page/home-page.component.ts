import { Component, OnDestroy } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { SelectedTestSingletonService } from '../../services/singletons/selected-test-singleton.service';
import { SelectedQuesitonBaseSingletonService } from '../../services/singletons/selected-quesiton-base-singleton.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, NavBarComponent, RouterOutlet],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnDestroy {
  constructor(
    private readonly selectedTestNameSingleton: SelectedTestSingletonService,
    private readonly selectedQuestionBaseSingleton: SelectedQuesitonBaseSingletonService
  ) {}

  ngOnDestroy(): void {
    this.selectedQuestionBaseSingleton.setSelectedQuestionBaseName(null);
    this.selectedTestNameSingleton.setSelectedTestName(null);
  }
}
