import { Component, OnInit } from '@angular/core';
import { Score } from '../../../../../common/models/types/score';
import { FinishService } from '../../../../services/finish/finish.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { DataSingletonService } from '../../../../services/singletons/data-singleton.service';

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss',
})
export class FinishComponent {
  constructor(
    private readonly finishService: FinishService,
    private readonly dataSingleton: DataSingletonService
  ) {
    this.finishService.gotScore$
      .pipe(takeUntilDestroyed())
      .subscribe((score) => {
        this.score = score;

        this.percentage = (
          (score.earnedPoints / score.maximumPoints) *
          100
        ).toFixed(2);

        this.username = dataSingleton.getData()!.username;

        this.deleteData();
      });
  }

  deleteData(): void {
    sessionStorage.removeItem('data');
    sessionStorage.removeItem('questionSet');
    sessionStorage.removeItem('selectedAnswers');
    sessionStorage.removeItem('startDate');
  }

  score: Score = {
    earnedPoints: 0,
    maximumPoints: 0,
  };

  percentage: string = '0';

  username: string = '';
}
