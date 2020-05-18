import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

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
import { UserComponent } from "./components/user/user.component";

import { FormatDatePipe } from './pipes/format-date.pipe';

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
    UserComponent,
    FormatDatePipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ChartModule,
    BrowserAnimationsModule,
    CalendarModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
  ],
  providers: [
    AuthGuardService,
    AuthService,
    AnonymusGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
