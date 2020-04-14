import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Info } from '../../models/info';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  email: string;
  password: string;
  info: { message: string } | undefined;
  error: Error | undefined;
  routeSub: Subscription;
  isOwnedUser: boolean;
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      this.userService.readById(params.id)
        .subscribe(
          (userResp: User) => {
            this.error = undefined;
            this.info = undefined;
            this.user = userResp;
            this.isOwnedUser = this.auth.getUserId() === userResp.id;
          },
          (error: Error) => {
            this.error = error;
          }
        );
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  delete(): void {
    this.error = undefined;
    this.info = undefined;

    this.userService.delete(this.user)
      .subscribe(
        () => {
          this.info = new Info('User deleted. You will be redirected.');

          setTimeout(() => {
            this.router.navigateByUrl('users');
          });
        },
        (error: Error) => {
          this.error = error;
        }
      );
  }
}