import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Info } from '../../models/info';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { EmailService } from '../../services/email.service';

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
    private emailS: EmailService
  ) { }

  ngOnInit() {
//default test sample
    this.user = new User('Loading','Loading',-1);

    this.routeSub = this.route.params.subscribe(() => {
      this.userService.readById(this.auth.getUserId())
        .subscribe(
          (userResp: User) => {
            this.error = undefined;
            this.info = undefined;
            this.user.password = userResp.password;
            this.user.email = userResp.email;
            this.user.id = this.auth.getUserId();
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
    this.auth.removeAuth();
    this.emailS.sendEmail("delete",this.user.email).subscribe(
      () => { },
      (error: Error) => {
        this.error = error;
      }
    );
    this.error = undefined;
    this.info = undefined;

    this.userService.delete(this.user)
      .subscribe(
        () => {
          this.info = new Info('User deleted. You will be redirected.');

          setTimeout(() => {
            this.router.navigateByUrl('items');
          });
        },
        (error: Error) => {
          this.error = error;
        }
      );
    window.location.reload();
  }
}
