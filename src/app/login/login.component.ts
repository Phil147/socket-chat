import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username = new FormControl();

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.auth.login(this.username.value);
    this.router.navigate(['chat']);
  }
}
