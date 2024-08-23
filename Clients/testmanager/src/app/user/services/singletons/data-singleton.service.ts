import { Injectable } from '@angular/core';
import { CompletingTestData } from '../../models/types/completingTestData';

@Injectable({
  providedIn: 'root',
})
export class DataSingletonService {
  setData(data: CompletingTestData | null): void {
    if (data == null) {
      sessionStorage.removeItem('data');
    }

    sessionStorage.setItem('data', JSON.stringify(data));
  }

  getData(): CompletingTestData | null {
    const data = sessionStorage.getItem('data');

    if (data == null || data == '') {
      return null;
    }

    var parsedData = JSON.parse(data);
    return parsedData;
  }

  setUsername(username: string): void {
    const data = sessionStorage.getItem('data');
    var parsedData: CompletingTestData = JSON.parse(data!);
    parsedData.username = username;
    sessionStorage.setItem('data', JSON.stringify(parsedData));
  }
}
