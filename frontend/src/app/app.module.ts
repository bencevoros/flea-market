import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemComponent } from './components/item/item.component';
import { ItemPage } from './components/item-page/item-page.component';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AnonymusGuardService } from './services/anonymus-guard.service';
import { UserPageComponent } from "./components/user-page/user-page.component";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuItemComponent,
    HeaderComponent,
    RegistrationComponent,
    LoginComponent,
    ItemComponent,
    ItemListComponent,
    ItemPage,
    CreateItemComponent,
    UserPageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuardService,
    AuthService,
    AnonymusGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
