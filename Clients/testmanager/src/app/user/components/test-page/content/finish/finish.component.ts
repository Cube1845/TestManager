import { Component, OnInit } from '@angular/core';
import { Score } from '../../../../models/types/score';
import { FinishService } from '../../../../services/finish/finish.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss',
})
export class FinishComponent implements OnInit {
  constructor(private readonly finishService: FinishService) {
    this.finishService.gotScore$
      .pipe(takeUntilDestroyed())
      .subscribe((score) => {
        this.score = score;
      });
  }

  ngOnInit(): void {
    sessionStorage.removeItem('data');
    sessionStorage.removeItem('questionSet');
    sessionStorage.removeItem('selectedAnswers');
  }

  score: Score = {
    earnedPoints: 0,
    maximumPoints: 0,
  };
}
