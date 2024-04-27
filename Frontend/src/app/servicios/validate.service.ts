import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidService {
  // Este es un ejemplo, deberías reemplazarlo con tus datos reales
  private user = {
    username: 'Pedro',
    password: '1234'
  };

  constructor() { }

  validateUser(username: string, password: string): boolean {
    return this.user.username === username && this.user.password === password;
  }
}
