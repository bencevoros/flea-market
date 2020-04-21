import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  error: Error | undefined;
  email: string | undefined;
  password: string | undefined;

  constructor(
    private auth: AuthService
  ) {
  }

  @Input()
  user: User;

  @Output()
  deleteUser = new EventEmitter();

  delete(): void {
    this.deleteUser.emit(this.user);
  }

}
