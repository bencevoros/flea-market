import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { Bid } from '../../models/bid';
import { User } from '../../models/user';
import { Follower } from '../../models/follower';
import { BidService } from '../../services/bid.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FollowerService } from '../../services/follower.service';
import { Info } from '../../models/info';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  bids: Bid[];
  price: number;
  wat: number;
  userPoints: number = 0;
  isLoggedIn: boolean = false;
  isUpToDate: boolean = false;
  isOwnLastBid: boolean = false;
  info: { message: string } | undefined;

  @Input()
  expired: boolean = true;

  @Input()
  item: Item;
  
  @Input()
  isOwnItem?: boolean;
  
  @Output()
  deleteItem = new EventEmitter();
  
  @Output()
  showError = new EventEmitter();

  bidValue: Bid = {
    amount: 0
  };

  constructor(
    private auth: AuthService,
    private bidService: BidService,
    private userService: UserService,
    private followerService: FollowerService,
  ) { }

  delete(): void {
    if (!this.isOwnItem) {
      return;
    }
    
    this.deleteItem.emit(this.item.id);
  }

  initializeBidding(): void {
    this.bidService.readByItemId(this.item)
      .subscribe(
        (response: { foundBids: Bid[] }) => {
          if (response.foundBids && response.foundBids.length) {
            this.bids = response.foundBids;
            this.bids.sort((a, b) => a.date ? 1 : a.date > b.date ? -1 : 0);
            this.bidValue.amount = this.bids[0].amount + 1;

            this.isOwnLastBid = this.bids[this.bids.length - 1]?.userId === this.auth.getUserId();
          }
          this.price = this.item.price
          
        },
        (error: Error) => {
          this.showError.emit(error);
        }
    );

    this.userService.readById(this.auth.getUserId()) //ez itt lehet béna im sorry
    .subscribe(
      (response: User) => {
        this.userPoints = response.points;
      },
      (error: Error) => {
        this.showError.emit(error);
      }
  );
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.isAuthenticated();
    this.initializeBidding();
  }

  changeBidCost(event, key: string): void {
    this.bidValue[key] = event.target.value.trim();
  }

  upToDateButtonClick(event): void {
    this.info = undefined;

    if(this.isUpToDate) {
      this.showError.emit(new Error("You are already up to date!"));
    }
    else if(this.userPoints >= 5) {

      const follow: Follower = {
        userId: this.auth.getUserId(),
        itemId: this.item.id
      };
      this.info = new Info('From now on you will be kept up to date on all bids for this item!'); //nem működik :^(

      this.followerService.create(follow)
      .subscribe(
        () => {
        },
        (error: Error) => {
          this.showError.emit(error);
        }
      );

      this.isUpToDate = true;
    }
    else {
      this.showError.emit(new Error("You dont have enough points!"));
    }

  }

  submitBid(e) {
    if (this.expired) {
      return;
    }
    // TODO: update numbers
    this.showError.emit(undefined);
    this.bidValue.date = new Date();
    this.bidValue.userId = this.auth.getUserId();
    this.bidValue.itemId = this.item.id;

    if (this.bidValue.amount <= this.item.price) {
      this.showError.emit(new Error('The bid amount cannot be smaller than the price of the item!'));
      return;
    }

    this.bidService.create(this.bidValue)
      .subscribe(
        () => {
          this.initializeBidding();

          this.price = this.bidValue.amount;
          this.bidValue.amount = 0;
          this.bidValue.date = new Date();
          this.bidValue.userId = undefined;
          this.bidValue.itemId = undefined;
        },
        (error: Error) => {
          this.showError.emit(error);
        }
      );
  }
}
