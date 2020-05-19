import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { Item } from '../../models/item';
import { Error } from '../../models/error';
import { ItemService } from '../../services/item.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'own-items-page',
  templateUrl: './own-items-page.component.html',
  styleUrls: ['./own-items-page.component.scss']
})
export class OwnItemPageComponent implements OnInit {
  items: Item[];
  error: Error;

  constructor(
    private itemService: ItemService,
    private auth: AuthService,
  ) { }


  getOwnItems(): void {
    this.itemService.readOwn(this.auth.getUserId())
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
    this.getOwnItems();
  }

  momentFunc(date) { return moment(date) };

}
