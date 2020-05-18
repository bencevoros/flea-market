import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { Bid } from '../../models/bid';
import { BidService } from '../../services/bid.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  bids: Bid[];
  price: number;
  isLoggedIn: boolean = false;
  isOwnLastBid: boolean = false;

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
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.isAuthenticated();
    this.initializeBidding();
  }

  changeBidCost(event, key: string): void {
    this.bidValue[key] = event.target.value.trim();
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
