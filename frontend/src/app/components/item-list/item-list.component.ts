import { Component, OnInit } from '@angular/core';
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
  error: Error;
  itemValue: Item = {
    name: '',
    price: 0,
    description: '',
    expireDate: new Date(),
  };

  constructor(private itemService: ItemService) { }

  change(event, key: string): void {
    this.itemValue[key] = event.target.value.trim();
  }

  getItems(): void {
    this.itemService.read()
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
    this.getItems();
  }

  create(event): void {
    event.preventDefault();
    this.error = undefined;

    if (!this.itemValue.name || !this.itemValue.price) {
      this.error = new Error('Name and price are required!');
      return;
    }

    this.itemService.create(this.itemValue)
      .subscribe(
        () => {
          console.log('ARE YOU SUCCESS?');
          this.itemValue.name = '';
          this.itemValue.description = '';
          this.itemValue.price = 0;

          this.getItems();
        },
        (error: Error) => {
          this.error = error;
        }
      );
  }

}
