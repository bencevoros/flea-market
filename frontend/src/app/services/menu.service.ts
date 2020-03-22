import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    constructor(private http: HttpClient) { }

    getMenuList(): Observable<MenuItem[]> {
        return of([
            { id: 1, name: 'Sample', link: 'sample' },
            { id: 2, name: 'Another', link: 'another' },
        ]);

    }
}
