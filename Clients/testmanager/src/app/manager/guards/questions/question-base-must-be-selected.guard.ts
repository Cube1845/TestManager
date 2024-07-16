import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SelectedQuesitonBaseSingletonService } from '../../services/singletons/selected-quesiton-base-singleton.service';

export const questionBaseMustBeSelectedGuard: CanActivateFn = (
  route,
  state
) => {
  const singleton = inject(SelectedQuesitonBaseSingletonService);
  const router = inject(Router);

  if (!singleton.isAnyQuestionBaseSelected()) {
    router.navigateByUrl('home/questions/base-manager');
    return false;
  }

  return true;
};
