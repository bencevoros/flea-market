import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  oldPassword: string;
  newPassword: string;
  validPassChange: boolean = false;

  constructor(
    private auth: AuthService
  ) {
  }

  @Input()
  user: User;

  @Output()
  deleteUser = new EventEmitter();

  @Output()
  showError = new EventEmitter();
  
  @Output()
  changePassword = new EventEmitter();

  delete(): void {
    this.deleteUser.emit(this.user);
  }

  passChange(event): void {
    if (!this.oldPassword) {
      this.validPassChange = false;
      return;
    } else if (!this.newPassword || !this.user.password) {
      this.validPassChange = false;
      return;
    } else if (this.newPassword !== this.user.password) {
      this.validPassChange = false;
      return;
    }

    this.validPassChange = true;
  }

  submit(event): void {
    this.showError.emit(undefined);
  
    if (this.newPassword !== this.user.password) {
      return this.showError.emit(new Error('Passwords must be same!'));
    } else if (!this.oldPassword) {
      return this.showError.emit(new Error('Old passwords is required!'));
    }

    this.changePassword.emit({ newPassword: this.newPassword, oldPassword: this.oldPassword });
  }

}
