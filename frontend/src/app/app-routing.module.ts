import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AnonymusGuardService } from './services/anonymus-guard.service';

import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { ItemPage } from './components/item-page/item-page.component';
import { UserPageComponent } from "./components/user-page/user-page.component";
import { WonItemPageComponent } from './components/won-items-page/won-items-page.component';
import { OwnItemPageComponent } from './components/own-items-page/own-items-page.component';

const routes: Routes = [
  {
    path: 'items',
    component: ItemListComponent,
    data: { title: 'Items' },
  },
  {
    path: 'item/:id',
    component: ItemPage,
    data: { title: 'Item' },
  },
  {
    path: 'create-item',
    component: CreateItemComponent,
    data: { title: 'Create item' },
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit-item/:id',
    component: CreateItemComponent,
    data: { title: 'Edit item' },
    canActivate: [AuthGuardService],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    data: { title: 'Registration' },
    canActivate: [AnonymusGuardService],
  },
  {
    path: 'user-page',
    component: UserPageComponent,
    data:{ title: 'User-page' },
    canActivate: [AuthGuardService],
  },
  {
    path: 'won-items',
    component: WonItemPageComponent,
    data: { title: 'Won items' },
    canActivate: [AuthGuardService],
  },
  {
    path: 'own-items',
    component: OwnItemPageComponent,
    data: { title: 'Own items' },
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
    canActivate: [AnonymusGuardService],
  },
  { path: '**',
    redirectTo: '/items',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
