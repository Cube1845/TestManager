import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor() { }

  loginUserWithEmailAndPassword(email: string, password: string): void {
    var loginDto = {
      email: email,
      password: password
    };

    console.log(loginDto);
  }
}
