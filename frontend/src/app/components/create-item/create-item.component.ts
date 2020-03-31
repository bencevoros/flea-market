import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { Error } from '../../models/error';
import { ItemService } from '../../services/item.service';
import { Info } from '../../models/info';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
  error: Error | undefined;
  info: Info | undefined;
  itemValue: Item = {
    name: '', price: 0, description: ''    
  };
  isEdit: boolean = false;

  constructor(
    private itemService: ItemService,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.isEdit = true;
        this.itemService.readById(params.id)
          .subscribe((item: Item) => {
            console.log(item);
            this.itemValue = item;
          },
          (error: Error) => {
            this.error = error;
          });
      }
    })
  }

  change(event, key: string): void {
    this.itemValue[key] = event.target.value.trim();
  }

  submit(e) {
    if (this.isEdit && this.itemValue.id) {
      this.update(e);
    } else {
      this.create(e);
    }
  }

  create(event): void {
    event.preventDefault();
    this.error = undefined;

    if (!this.itemValue.name || !this.itemValue.price) {
      this.error = new Error('Name and price are required!');
      return;
    }

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

    if (!this.itemValue.name || !this.itemValue.price) {
      this.error = new Error('Name and price are required!');
      return;
    }

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
