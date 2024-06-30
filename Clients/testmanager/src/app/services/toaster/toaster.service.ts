import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  toastrSetting: Partial<IndividualConfig<any>>;

  constructor(private readonly toastr: ToastrService) {
    this.toastrSetting = {
      timeOut: 50000,
      closeButton: true,
    };
  }

  displayError(message: string): void {
    this.toastr.error(message, 'Błąd', this.toastrSetting);
  }
}
