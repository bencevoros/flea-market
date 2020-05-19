import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { Item } from '../../models/item';
import { Error } from '../../models/error';
import { ItemService } from '../../services/item.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'won-items-page',
  templateUrl: './won-items-page.component.html',
  styleUrls: ['./won-items-page.component.scss']
})
export class WonItemPageComponent implements OnInit {
  items: Item[];
  error: Error;

  constructor(
    private itemService: ItemService,
    private auth: AuthService,
  ) { }


  getWonItems(): void {
    this.itemService.readWon(this.auth.getUserId())
      .subscribe(
        (itemResp: Item[]) => {
          this.error = undefined;
          this.items = itemResp;
        },
        (error: Error) => {
          this.error = error;
        }
      );
  }

  ngOnInit() {
    this.getWonItems();
  }

  momentFunc(date) { return moment(date) };

}
