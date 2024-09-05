import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HistoryService } from '../../services/testhistory/history/history.service';

export const testHistoryMustBeLoadedGuard: CanActivateFn = (route, state) => {
  const historyService = inject(HistoryService);
  const router = inject(Router);

  const testHistory = historyService.getTestHistory();

  if (testHistory == null) {
    router.navigateByUrl('home/test-history/tests');
    return false;
  }

  return true;
};
