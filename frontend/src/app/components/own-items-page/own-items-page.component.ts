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
  filteredItems: Item[];
  searchValue: string;
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
          this.filteredItems = itemResp;
        },
        (error: Error) => {
          this.error = error;
        }
      );
  }

  ngOnInit() {
    this.getOwnItems();
  }

  search(event) {
    this.searchValue.toLowerCase();

    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(this.searchValue)
      || item.description.toLowerCase().includes(this.searchValue));
  }

  momentFunc(date) { return moment(date) };

}
