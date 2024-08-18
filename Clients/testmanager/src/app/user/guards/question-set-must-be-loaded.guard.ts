import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { QuestionSetSingletonService } from '../services/singletons/question-set-singleton.service';

export const questionSetMustBeLoadedGuard: CanActivateFn = (route, state) => {
  const questionSetSingleton = inject(QuestionSetSingletonService);
  const router = inject(Router);

  if (questionSetSingleton.getQuestionSet() == null) {
    router.navigateByUrl('test/start');
    return false;
  }

  return true;
};
