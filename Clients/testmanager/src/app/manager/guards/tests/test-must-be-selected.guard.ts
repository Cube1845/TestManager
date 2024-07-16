import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SelectedTestSingletonService } from '../../services/singletons/selected-test-singleton.service';

export const testMustBeSelectedGuard: CanActivateFn = (route, state) => {
  const singleton = inject(SelectedTestSingletonService);
  const router = inject(Router);

  if (!singleton.isAnyTestSelected()) {
    router.navigateByUrl('home/tests/manager');
    return false;
  }

  return true;
};
