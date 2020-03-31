import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { Info } from '../../models/info';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    email: string;
    password: string;
    info: { message: string } | undefined;
    error: Error | undefined;

    constructor(
        private loginService: LoginService,
    ) { }

    onSubmit(e) {
      e.preventDefault();

      this.error = undefined;
      this.info = undefined;

      if (!this.email || !this.password) {
          this.error = new Error('Email end password required');
          return;
      }

      const user = new User(this.email, this.password);
      this.loginService.login(user)
          .subscribe(
              (response: { token: string }) => {
                if (!response.token) {
                    return this.error = new Error('Login failed.');
                }

                this.info = new Info('Login success. You will be redirected to the home page.');

                localStorage.setItem('auth', JSON.stringify({ token: response.token, email: this.email}));

                setTimeout(() => {
                    window.location.reload();
                }, 5000);
              },
              (error: Error) => {
                  this.error = error;
              }
          );
    }

    onInputChange(e, name: string) {
        this[name] = e.target.value;
    }

}
