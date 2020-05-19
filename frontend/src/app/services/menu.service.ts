import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item';
import { Observable, of } from 'rxjs';
import { AnonymusGuardService } from './anonymus-guard.service';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    constructor(
      private http: HttpClient,
      private anonymGuard: AnonymusGuardService,
      private authGuard: AuthGuardService,
    ) { }

    getMenuList(): Observable<MenuItem[]> {
      const menu = [
        { id: 1, name: 'Items', link: 'items' },
      ];

      if (this.anonymGuard.canActivate()) {
        menu.push(
          { id: 3, name: 'Registration', link: 'registration' },
          { id: 4, name: 'Login', link: 'login' },
        );
      } else if (this.authGuard.canActivate()) {
        menu.push(
          { id: 2, name: 'Create item', link: 'create-item' },
          { id: 5, name: 'User page', link: 'user-page'},
          { id: 6, name: 'Won items', link: 'won-items'},
          { id: 7, name: 'Own items', link: 'own-items'},
        );
      }

      return of(menu);
    }
}
