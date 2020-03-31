import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Info } from '../../models/info';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPage implements OnInit {

  item: Item;
  isOwnedItem: boolean = false;
  info: Info | undefined;
  error: Error | undefined;

  routeSub: Subscription;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) { }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {
      this.itemService.readById(params.id)
        .subscribe(
          (itemResp: Item) => {
            this.error = undefined;
            this.info = undefined;
            this.item = itemResp;
            this.isOwnedItem = this.auth.getUserId() === itemResp.userId;
          },
          (error: Error) => {
            this.error = error;
          }
        );
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  delete(): void {
    this.error = undefined;
    this.info = undefined;

    this.itemService.delete(this.item)
      .subscribe(
        () => {
          this.info = new Info('Item deleted. You will be redirected.');

          setTimeout(() => {
            this.router.navigateByUrl('items');
          });
        },
        (error: Error) => {
          this.error = error;
        }
      );
  }
}
