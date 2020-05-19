import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Info } from '../../models/info';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { EmailService } from '../../services/email.service';
import { Bid } from '../../models/bid';
import { BidService } from '../../services/bid.service';

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
  bidNumberData: any;

  constructor(
    private userService: UserService,
    private bidService: BidService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private emailS: EmailService
  ) { }

  

  ngOnInit() {
    //this.routeSub = this.route.params.subscribe(() => {
      this.userService.readById(this.auth.getUserId())
        .subscribe(
          (userResp: User) => {
            this.error = undefined;
            this.info = undefined;
            this.user = userResp;
          },
          (error: Error) => {
            this.error = error;
          }
        );

      this.bidService.findByUserId(this.auth.getUserId())
        .subscribe(
          (bids: Bid[]) => {
            let currentBids = 0;
            const datasets = [{
              label: 'Daily bids',
              data: [],
              fill: false,
              borderColor: '#4bc0c0'
            }];

            const labels = new Array(30).fill(0).map((number, index) => {
              const currentDate = moment().subtract(30 - (index + 1), 'days');
              const day = currentDate.format('DD');
              
              bids.forEach((bid) => moment(bid.date).isSame(currentDate, 'days') && currentBids++);
              datasets[0].data.push(currentBids);
              currentBids = 0;

              return day;
            });

            this.bidNumberData = {
              labels,
              datasets
            };
          },
          (error: Error) => {
            this.error = error;
          }
        )
    //});
  }

  ngOnDestroy() {
    //this.routeSub.unsubscribe();
  }

  submitNewPass(passObj): void {
    this.error = undefined;
    this.info = undefined;

    this.userService.update({ ...this.user, ...passObj })
      .subscribe(
        () => this.info = new Info('Password changed.'),
        (error: Error) => this.error = error
      );
  }

  delete(): void {
    this.error = undefined;
    this.info = undefined;

    this.userService.delete(this.user)
      .subscribe(() => {
          this.info = new Info('User deleted. You will be redirected.');
          this.auth.removeAuth();
          setTimeout(() => {
            this.emailS.sendEmail("delete",this.user.email).subscribe(
              () => { },
              (error: Error) => {
                this.error = error;
              }
            );
            this.router.navigateByUrl('items');
            window.location.reload();
          },3000);

        },
        (error: Error) => {
          this.error = error;
        }
      );
  }

  showError(err: Error | undefined) {
    this.error = err;
  }
}
