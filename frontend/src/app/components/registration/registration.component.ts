import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../models/user';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  email: string;
  password: string;
  info: { message: string } | undefined;
  error: Error | undefined;

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit(e) {
    e.preventDefault();

    this.error = undefined;
    this.info = undefined;

    if (!this.email || !this.password) {
      this.error = new Error('Email end password required');
      return;
    }

    const user = new User(this.email, this.password);
    this.registrationService.create(user)
      .subscribe(
        () => {
          this.info = {
            message: 'Registration success. You will be redirected to the Login page.'
          };

          setTimeout(() => {
            this.router.navigateByUrl('/samples');
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
