import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { Item } from '../../models/item';
import { Error } from '../../models/error';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: Item[];
  filteredItems: Item[];
  searchValue: string;
  error: Error;

  constructor(private itemService: ItemService) { }


  getItems(): void {
    this.itemService.read()
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
    this.getItems();
  }

  search() {
    this.searchValue.toLowerCase();

    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(this.searchValue)
      || item.description.toLowerCase().includes(this.searchValue));
  }

  momentFunc(date) { return moment(date) };

}
