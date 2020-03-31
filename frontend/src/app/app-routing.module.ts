import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AnonymusGuardService } from './services/anonymus-guard.service';

import { SampleListComponent } from './components/sample-list/sample-list.component';
import { AnotherPageComponent } from './components/another-page/another-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { ItemPage } from './components/item-page/item-page.component';

const routes: Routes = [
  {
    path: 'items',
    component: ItemListComponent,
    data: { title: 'Items' },
  },
  {
    path: 'samples',
    component: SampleListComponent,
    data: { title: 'Samples' }
  },
  {
    path: 'another',
    component: AnotherPageComponent,
    data: { title: 'Another' },
    canActivate: [AuthGuardService],
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
