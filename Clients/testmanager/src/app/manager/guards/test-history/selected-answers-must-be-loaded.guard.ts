import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SelectedAnswersService } from '../../services/testhistory/selected-answers/selected-answers.service';

export const selectedAnswersMustBeLoadedGuard: CanActivateFn = (
  route,
  state
) => {
  const selectedAnswersService = inject(SelectedAnswersService);
  const router = inject(Router);

  const contentSelectedAnswers =
    selectedAnswersService.getContentSelectedAnswers();

  if (contentSelectedAnswers == null) {
    router.navigateByUrl('home/test-history/tests');
    return false;
  }

  return true;
};
