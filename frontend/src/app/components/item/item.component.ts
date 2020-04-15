import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item';
import { Bid } from '../../models/bid';
import { BidService } from '../../services/bid.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  error: Error | undefined;
  bids: Bid[];
  price: number;
  constructor(
    private auth: AuthService,
    private bidService: BidService,
  ) { }

  public isLoggedIn: boolean = false;

  @Input()
  item: Item;
  
  @Input()
  isOwnItem?: boolean;
  
  @Output()
  deleteItem = new EventEmitter();

  bidValue: Bid = {
    amount: 0
  };

  delete(): void {
    if (!this.isOwnItem) {
      return;
    }
    
    this.deleteItem.emit(this.item.id);
  }

  getBids(): void {

      this.bidService.readByItemId(this.item)
          .subscribe(
              (response: { foundBids: Bid[] }) => {

              this.bids = response.foundBids;

              },
              (error: Error) => {
                  this.error = error;
              }
       );
  }

  ngOnInit() {
    this.bidValue.amount = this.item.price;

    this.isLoggedIn = this.auth.isAuthenticated();
    this.getBids();
    if (this.bids && this.bids.length) {

    }
    else {
      
    }
    this.price = this.item.price;
  }

  changeBidCost(event, key: string): void {
    this.bidValue[key] = event.target.value.trim();
  }

  submitBid(e) {
    this.error = undefined;
    this.bidValue.date = new Date();
    this.bidValue.userId = this.auth.getUserId();
    this.bidValue.itemId = this.item.id;
   
    console.log("Amount: "+this.bidValue.amount+"\nDate:"+this.bidValue.date);

    if (this.bidValue.amount < this.item.price) {
      this.error = new Error('The bid amount cannot be smaller than the price of the item!');
      return;
    }

    this.bidService.create(this.bidValue)
      .subscribe(
        () => {
          this.bidValue.amount = 0;
          this.bidValue.date = new Date();
          this.bidValue.userId = undefined;
          this.bidValue.itemId = undefined;
        },
        (error: Error) => {
          this.error = error;
        }
      );
  }
}
