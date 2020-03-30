import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu-item';
import { MenuService } from '../../services/menu.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    public menuList: MenuItem[];
    public isLoggedIn: boolean = false;

    constructor(
        private menuService: MenuService,
        private auth: AuthService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.menuService.getMenuList().subscribe(res => this.menuList = res);

        this.isLoggedIn = this.auth.isAuthenticated();
    }

    onLogOutClick() {
        this.auth.removeAuth();

        window.location.reload();
    }

}
