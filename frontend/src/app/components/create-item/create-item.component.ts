import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { Item } from '../../models/item';
import { Error } from '../../models/error';
import { ItemService } from '../../services/item.service';
import { Info } from '../../models/info';
import { AuthService } from '../../services/auth.service';
import { BidService } from '../../services/bid.service';
import { ActivatedRoute } from '@angular/router';
import { Bid } from '../../models/bid';

@Component({
  selector: 'create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
  error: Error | undefined;
  info: Info | undefined;
  hasBids: boolean;
  origPrice: number;
  itemValue: Item = {
    name: '',
    price: 0,
    description: '',
    expireDate: moment().add(31, 'days').toDate(),
  };
  isEdit: boolean = false;
  disabledPriceInput: boolean = false;

  minDateValue: Date;
  maxDateValue: Date;

  constructor(
    private itemService: ItemService,
    private bidService: BidService,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.minDateValue = moment().add(1, 'days').toDate();
    this.maxDateValue = moment().add(93, 'days').toDate();

    this.route.params.subscribe((params) => {
      if (params.id) {
        this.isEdit = true;
        this.itemService.readById(params.id)
          .subscribe((item: Item) => {
            this.itemValue = {
              ...item,
              expireDate: moment(item.expireDate).toDate(),
            };
            
            if (this.isEdit) {
              this.origPrice = item.price
              this.checkBids(this.itemValue);
            } else {
              this.hasBids = false;
            }
          },
          (error: Error) => {
            this.error = error;
          });
      }
    })
  }

  //Ez egy elég lusta módja annak hogy ellenőrizzük van-e bid szerintem, de ha valaki akarja átírhatja ;^)
  checkBids(item: Item){
    this.bidService.readByItemId(this.itemValue)
      .subscribe(
        (response: { foundBids: Bid[] }) => {
  
          if(response.foundBids.length != 0) {
            this.hasBids = true;
            this.disabledPriceInput = true;
          }
          else {
            this.hasBids = false;
          }
          
        },
        (error: Error) => {
            this.error = error;
        }
      );
  }

  change(event, key: string): void {
    this.itemValue[key] = event.target.value.trim();
  }

  submit(e) {

    if (!this.itemValue.name || !this.itemValue.price) {
      this.error = new Error('Name and price are required!');
      return;
    }

    if (this.itemValue.price < 0) {
      this.error = new Error('The items price can not be smaller than 0!');
      return;
    }

    if (this.hasBids && this.itemValue.price != this.origPrice) {
      this.error = new Error('The price of an item with active bids can not be edited!');
      return;
    }

    if (this.isEdit && this.itemValue.id) {
      this.update(e);
    } else {
      this.create(e);
    }
  }

  create(event): void {
    event.preventDefault();
    this.error = undefined;

    this.itemValue.userId = this.auth.getUserId();

    this.itemService.create(this.itemValue)
      .subscribe(
        () => {
          this.itemValue.name = '';
          this.itemValue.description = '';
          this.itemValue.price = 0;
          this.itemValue.userId = undefined;

          this.info = new Info('Item created.');

          setTimeout(() => {
            this.info = undefined;
          }, 5000);
        },
        (error: Error) => {
          this.error = error;
        }
      );
  }
  
  update(event): void {
    event.preventDefault();
    this.error = undefined;

    this.itemValue.userId = this.auth.getUserId();

    this.itemService.update(this.itemValue)
      .subscribe(
        () => {
          this.info = new Info('Item updated.');
          
          setTimeout(() => {
            this.info = undefined;
          }, 5000);
        },
        (error: Error) => {
          this.error = error;
        }
      );
  }

}
