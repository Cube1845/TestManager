import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private readonly toastr: ToastrService) {}

  displayError(message: string): void {
    this.toastr.error(message, 'Błąd', {
      timeOut: 8000,
      closeButton: true,
    });
  }

  displaySuccess(message: string, timeOut: number = 2500): void {
    this.toastr.success(message, '', {
      timeOut: timeOut,
      closeButton: true,
    });
  }
}
