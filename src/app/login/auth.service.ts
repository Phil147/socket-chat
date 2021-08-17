import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private user = new BehaviorSubject<string>('');
  
  login(username: string) {
    this.user.next(username);
  }

  getUser() {
    return this.user;
  }
}